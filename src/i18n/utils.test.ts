import { describe, expect, it } from "vitest";
import { defaultLang, ui } from "./ui";
import {
  getLangFromUrl,
  getLocaleFromLang,
  useTranslatedPath,
  useTranslations,
} from "./utils";

const url = (path: string) => new URL(path, "https://rpcide.cloud");

describe("getLangFromUrl", () => {
  it.each([
    ["/es", "es"],
    ["/pt/about", "pt"],
    ["/en/contact", "en"],
  ])("detects the locale in %s", (path, expected) => {
    expect(getLangFromUrl(url(path))).toBe(expected);
  });

  it.each(["/", "/fr/about", "/about", "/shared/abc"])(
    "falls back to the default language for %s",
    (path) => {
      expect(getLangFromUrl(url(path))).toBe(defaultLang);
    },
  );
});

describe("getLocaleFromLang", () => {
  it("maps each language to its BCP 47 locale", () => {
    expect(getLocaleFromLang("en")).toBe("en-US");
    expect(getLocaleFromLang("es")).toBe("es-ES");
    expect(getLocaleFromLang("pt")).toBe("pt-PT");
  });

  it("falls back to the default locale for unknown languages", () => {
    expect(getLocaleFromLang("fr" as keyof typeof ui)).toBe("en-US");
  });
});

describe("useTranslations", () => {
  it("returns the string for the requested language", () => {
    expect(useTranslations("es")("nav.home")).toBe(ui.es["nav.home"]);
    expect(useTranslations("pt")("hero.cta")).toBe(ui.pt["hero.cta"]);
  });

  it("falls back to English when a key is missing in the locale", () => {
    const key = "nav.home" as const;
    const original = ui.es[key];
    // Simulate a missing translation.
    (ui.es as Record<string, string>)[key] = "";
    try {
      expect(useTranslations("es")(key)).toBe(ui.en[key]);
    } finally {
      (ui.es as Record<string, string>)[key] = original;
    }
  });
});

describe("useTranslatedPath", () => {
  it("prefixes paths with the current language", () => {
    expect(useTranslatedPath("es")("/about")).toBe("/es/about");
    expect(useTranslatedPath("en")("/contact")).toBe("/en/contact");
  });

  it("accepts an explicit target language", () => {
    expect(useTranslatedPath("es")("/about", "pt")).toBe("/pt/about");
  });
});
