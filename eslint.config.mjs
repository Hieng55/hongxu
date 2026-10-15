import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "work/**",
    ".sites-runtime/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Assets are pre-sized and compressed locally for the Vinext/Cloudflare runtime.
      "@next/next/no-img-element": "off",
    },
  },
]);

export default eslintConfig;
