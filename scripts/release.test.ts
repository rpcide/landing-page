import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const script = resolve(__dirname, "release.mjs");
let dirs: string[] = [];

/** Creates a throwaway git repo with the given version and commit subjects. */
function repo(version: string, commits: string[], tag?: string) {
  const dir = mkdtempSync(join(tmpdir(), "release-test-"));
  dirs.push(dir);
  const git = (...args: string[]) =>
    execFileSync("git", args, { cwd: dir, stdio: "pipe" });
  git("init", "-q");
  git("config", "user.name", "test");
  git("config", "user.email", "test@example.com");
  git("config", "commit.gpgsign", "false");
  writeFileSync(join(dir, "package.json"), JSON.stringify({ version }));
  git("add", ".");
  git("commit", "-q", "-m", "chore: init");
  if (tag) git("tag", "-a", tag, "-m", tag);
  for (const message of commits) {
    const [subject, ...body] = message.split("\n\n");
    git("commit", "-q", "--allow-empty", "-m", subject, ...(body.length ? ["-m", body.join("\n\n")] : []));
  }
  return dir;
}

function dryRun(dir: string, bump = "auto") {
  const res = spawnSync("node", [script, bump, "--dry-run"], { cwd: dir, encoding: "utf8" });
  return { code: res.status, out: res.stdout, err: res.stderr };
}

const next = (out: string) => out.match(/^Next:\s+(\S+)/m)?.[1];

afterEach(() => {
  for (const dir of dirs) rmSync(dir, { recursive: true, force: true });
  dirs = [];
});

describe("scripts/release.mjs (dry run)", () => {
  it("bumps patch for fixes only", () => {
    const dir = repo("1.2.3", ["fix: a bug"], "v1.2.3");
    expect(next(dryRun(dir).out)).toBe("1.2.4");
  });

  it("bumps minor when there is a feature", () => {
    const dir = repo("1.2.3", ["fix: a bug", "feat(hero): new CTA"], "v1.2.3");
    expect(next(dryRun(dir).out)).toBe("1.3.0");
  });

  it.each(["feat!: drop route", "feat: drop route\n\nBREAKING CHANGE: /old removed"])(
    "bumps major for breaking changes (%s)",
    (commit) => {
      const dir = repo("1.2.3", [commit], "v1.2.3");
      expect(next(dryRun(dir).out)).toBe("2.0.0");
    },
  );

  it("bumps minor instead of major while on 0.x", () => {
    const dir = repo("0.4.1", ["feat!: drop route"], "v0.4.1");
    expect(next(dryRun(dir).out)).toBe("0.5.0");
  });

  it("honours explicit bump levels and versions", () => {
    const dir = repo("1.2.3", ["fix: a bug"], "v1.2.3");
    expect(next(dryRun(dir, "major").out)).toBe("2.0.0");
    expect(next(dryRun(dir, "minor").out)).toBe("1.3.0");
    expect(next(dryRun(dir, "4.5.6").out)).toBe("4.5.6");
  });

  it("only considers commits since the last tag", () => {
    const dir = repo("1.0.0", [], "v1.0.0");
    const { code, err } = dryRun(dir);
    expect(code).toBe(1);
    expect(err).toContain("no commits since v1.0.0");
  });

  it("groups commits into changelog sections", () => {
    const dir = repo("1.0.0", ["feat(nav): add menu", "fix: typo", "docs: readme"], "v1.0.0");
    const { out } = dryRun(dir);
    expect(out).toContain("### Features");
    expect(out).toContain("- **nav:** add menu");
    expect(out).toContain("### Bug Fixes");
    expect(out).toContain("### Documentation");
    expect(out).not.toContain("BREAKING");
  });

  it("rejects unknown bump levels", () => {
    const dir = repo("1.0.0", ["fix: x"], "v1.0.0");
    const { code, err } = dryRun(dir, "huge");
    expect(code).toBe(1);
    expect(err).toContain('unknown bump "huge"');
  });
});
