// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ModeToggle } from "./ModeToggle";

const root = () => document.documentElement;

function mockPrefersDark(matches: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
}

async function choose(option: string) {
  const user = userEvent.setup();
  await user.click(screen.getByRole("button", { name: /toggle theme/i }));
  await user.click(await screen.findByRole("menuitem", { name: option }));
}

describe("ModeToggle", () => {
  beforeEach(() => root().classList.remove("dark"));
  afterEach(() => vi.unstubAllGlobals());

  it("keeps the dark class if the page already started in dark mode", () => {
    root().classList.add("dark");
    render(<ModeToggle />);
    expect(root()).toHaveClass("dark");
  });

  it("switches to dark and back to light", async () => {
    render(<ModeToggle />);
    expect(root()).not.toHaveClass("dark");

    await choose("Dark");
    expect(root()).toHaveClass("dark");

    await choose("Light");
    expect(root()).not.toHaveClass("dark");
  });

  it.each([
    [true, true],
    [false, false],
  ])("system mode follows prefers-color-scheme (dark=%s)", async (prefersDark, expected) => {
    mockPrefersDark(prefersDark);
    render(<ModeToggle />);

    await choose("System");
    expect(root().classList.contains("dark")).toBe(expected);
  });
});
