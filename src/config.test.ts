import { describe, expect, it } from "vitest";
import config from "./config";

describe("config", () => {
  it.each(["apiUrl", "appUrl"] as const)("%s is an absolute https URL without a trailing slash", (key) => {
    const value = config[key];
    expect(new URL(value).protocol).toBe("https:");
    expect(value.endsWith("/")).toBe(false);
  });

  it("has a valid support email", () => {
    expect(config.supportEmail).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  });
});
