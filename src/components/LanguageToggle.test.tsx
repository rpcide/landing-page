// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ui } from "@/i18n/ui";
import { LanguageToggle } from "./LanguageToggle";

describe("LanguageToggle", () => {
  let href: string;

  beforeEach(() => {
    href = "https://rpcide.cloud/es";
    // jsdom does not implement navigation; capture the assignment instead.
    vi.stubGlobal("location", {
      get href() {
        return href;
      },
      set href(value: string) {
        href = value;
      },
    });
  });
  afterEach(() => vi.unstubAllGlobals());

  async function open(lang: "en" | "es" | "pt") {
    const user = userEvent.setup();
    render(<LanguageToggle lang={lang} />);
    await user.click(screen.getByRole("button"));
    return user;
  }

  it("shows the menu label in the current language with every option", async () => {
    await open("es");
    expect(await screen.findByText(ui.es.languages)).toBeInTheDocument();
    expect(screen.getAllByRole("menuitemradio")).toHaveLength(3);
    expect(screen.getByRole("menuitemradio", { name: "Español" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("navigates to the selected language", async () => {
    const user = await open("es");
    await user.click(await screen.findByRole("menuitemradio", { name: "English" }));
    expect(href).toBe("/en");
  });

  it("does not navigate when the current language is selected", async () => {
    const user = await open("es");
    await user.click(await screen.findByRole("menuitemradio", { name: "Español" }));
    expect(href).toBe("https://rpcide.cloud/es");
  });
});
