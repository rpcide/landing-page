import { describe, expect, it } from "vitest";
import { defaultLang, languages, ui } from "./ui";

const locales = Object.keys(ui) as (keyof typeof ui)[];
const baseKeys = Object.keys(ui[defaultLang]).sort();

describe("translations", () => {
  it("defines a translation table for every supported language", () => {
    expect(locales.sort()).toEqual(Object.keys(languages).sort());
    expect(locales).toContain(defaultLang);
  });

  it.each(locales)("%s has exactly the same keys as the default language", (lang) => {
    expect(Object.keys(ui[lang]).sort()).toEqual(baseKeys);
  });

  it.each(locales)("%s has no empty strings", (lang) => {
    const empty = Object.entries(ui[lang])
      .filter(([, value]) => typeof value !== "string" || value.trim() === "")
      .map(([key]) => key);
    expect(empty).toEqual([]);
  });
});
