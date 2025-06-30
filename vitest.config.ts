import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"], // Only test .test.ts files
    exclude: ["src/**/*.tsx", "src/**/*.jsx"], // Exclude React components
    globals: true,
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "lcov"],
    },
  },
});
