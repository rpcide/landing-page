/// <reference types="vitest" />
import { getViteConfig } from "astro/config";

// getViteConfig reuses Astro's Vite setup, so the `@/` alias, React and
// `.astro` components (via the Container API) work in tests.
export default getViteConfig({
  test: {
    include: ["src/**/*.test.{ts,tsx}", "scripts/**/*.test.{ts,mjs}"],
    setupFiles: ["./vitest.setup.ts"],
    restoreMocks: true,
    coverage: {
      provider: "v8",
      // scripts/release.mjs is tested end-to-end in a subprocess, so v8 cannot see it.
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["**/*.test.*", "src/**/*.d.ts", "src/components/ui/**"],
      reporter: ["text", "html", "lcov"],
    },
  },
});
