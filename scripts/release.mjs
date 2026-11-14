#!/usr/bin/env node
// Zero-dependency release script (SemVer + Conventional Commits).
//
// Usage:
//   node scripts/release.mjs [auto|patch|minor|major|<x.y.z>] [--dry-run] [--no-git]
//
// - Determines the next version (auto = derived from commits since the last tag).
// - Updates package.json and package-lock.json.
// - Prepends a new section to CHANGELOG.md.
// - Creates a "chore(release): vX.Y.Z" commit and an annotated vX.Y.Z tag.
// It never pushes. Run `git push --follow-tags` yourself.

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const noGit = args.includes("--no-git");
const bumpArg = args.find((a) => !a.startsWith("--")) ?? "auto";

const git = (...a) =>
  execFileSync("git", a, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
const fail = (msg) => {
  console.error(`release: ${msg}`);
  process.exit(1);
};

const SECTIONS = [
  ["feat", "Features"],
  ["fix", "Bug Fixes"],
  ["perf", "Performance"],
  ["refactor", "Refactoring"],
  ["docs", "Documentation"],
  ["style", "Styling"],
  ["build", "Build"],
  ["ci", "CI"],
  ["revert", "Reverts"],
];

// --- current state ---------------------------------------------------------
const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const current = pkg.version;

if (!noGit && !dryRun && git("status", "--porcelain")) {
  fail("working tree is not clean. Commit or stash your changes first.");
}

let lastTag = "";
try {
  lastTag = git("describe", "--tags", "--abbrev=0", "--match", "v*");
} catch {
  /* no tag yet: use the full history */
}

const range = lastTag ? `${lastTag}..HEAD` : "HEAD";
const raw = git("log", range, "--no-merges", "--format=%H%x1f%s%x1f%b%x1e");
const commits = raw
  .split("\x1e")
  .map((c) => c.trim())
  .filter(Boolean)
  .map((c) => {
    const [hash, subject, body = ""] = c.split("\x1f");
    const m = subject.match(/^(\w+)(?:\(([^)]+)\))?(!)?:\s*(.+)$/);
    return {
      hash: hash.slice(0, 7),
      type: m ? m[1].toLowerCase() : null,
      scope: m?.[2] ?? null,
      breaking: Boolean(m?.[3]) || /BREAKING[ -]CHANGE:/.test(body),
      subject: m ? m[4] : subject,
    };
  });

if (commits.length === 0) fail(`no commits since ${lastTag || "the beginning"}.`);

// --- compute next version --------------------------------------------------
const [maj, min, pat] = current.split(".").map(Number);
let next;
if (/^\d+\.\d+\.\d+$/.test(bumpArg)) {
  next = bumpArg;
} else {
  let level = bumpArg;
  if (level === "auto") {
    level = commits.some((c) => c.breaking)
      ? "major"
      : commits.some((c) => c.type === "feat")
        ? "minor"
        : "patch";
  }
  // While on 0.x, breaking changes bump minor (SemVer initial development).
  if (level === "major" && maj === 0) level = "minor";
  if (level === "major") next = `${maj + 1}.0.0`;
  else if (level === "minor") next = `${maj}.${min + 1}.0`;
  else if (level === "patch") next = `${maj}.${min}.${pat + 1}`;
  else fail(`unknown bump "${bumpArg}" (use auto|patch|minor|major|x.y.z).`);
}
const tag = `v${next}`;

// --- changelog entry -------------------------------------------------------
const fmt = (c) =>
  `- ${c.scope ? `**${c.scope}:** ` : ""}${c.subject} (\`${c.hash}\`)`;
const lines = [`## [${next}] - ${new Date().toISOString().slice(0, 10)}`, ""];

const breaking = commits.filter((c) => c.breaking);
if (breaking.length) lines.push("### ⚠ BREAKING CHANGES", "", ...breaking.map(fmt), "");
for (const [type, title] of SECTIONS) {
  const group = commits.filter((c) => c.type === type);
  if (group.length) lines.push(`### ${title}`, "", ...group.map(fmt), "");
}
const entry = lines.join("\n");

console.log(`Current: ${current}\nNext:    ${next} (${tag})\n\n${entry}`);
if (dryRun) process.exit(0);

// --- write files -----------------------------------------------------------
const HEADER =
  "# Changelog\n\nAll notable changes to this project are documented here.\n" +
  "Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); " +
  "this project follows [Semantic Versioning](https://semver.org/).\n\n";
const old = existsSync("CHANGELOG.md") ? readFileSync("CHANGELOG.md", "utf8") : "";
const body = old.includes("\n## ") ? old.slice(old.indexOf("\n## ") + 1) : "";
writeFileSync("CHANGELOG.md", `${HEADER}${entry}\n${body}`);

pkg.version = next;
writeFileSync("package.json", `${JSON.stringify(pkg, null, 2)}\n`);
if (existsSync("package-lock.json")) {
  const lock = JSON.parse(readFileSync("package-lock.json", "utf8"));
  lock.version = next;
  if (lock.packages?.[""]) lock.packages[""].version = next;
  writeFileSync("package-lock.json", `${JSON.stringify(lock, null, 2)}\n`);
}

if (!noGit) {
  git("add", "package.json", "package-lock.json", "CHANGELOG.md");
  git("commit", "-m", `chore(release): ${tag}`);
  git("tag", "-a", tag, "-m", `Release ${tag}`);
  console.log(`\nCreated commit and tag ${tag}. Push with: git push --follow-tags`);
}
