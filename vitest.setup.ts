import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Only DOM tests (jsdom environment) render with Testing Library.
afterEach(() => {
  if (typeof document !== "undefined") cleanup();
});
