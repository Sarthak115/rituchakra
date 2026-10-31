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
    "next-env.d.ts",
    // Local build output and scratch folders (all gitignored).
    ".vercel/**",
    ".output/**",
    ".vinext/**",
    ".wrangler/**",
    "dist/**",
    "work/**",
  ]),
  {
    // Plain <a> on purpose: vinext 1.0.0-beta.5's next/link client navigation throws
    // ("RSC prefetch setup error") in production builds, leaving links dead. Full page
    // loads are reliable. Re-test next/link before switching after a vinext upgrade.
    rules: { "@next/next/no-html-link-for-pages": "off" },
  },
  {
    // RituReels is hidden from navigation but kept intact (see docs/RITUCHAKRA_CONTEXT.md);
    // its player is deliberately not refactored. Fix these before re-enabling reels.
    files: ["components/reels/**/*.tsx", "lib/reels/**/*.ts"],
    rules: {
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
      "prefer-const": "off",
    },
  },
  {
    files: ["components/ui/**/*.{ts,tsx}", "hooks/use-mobile.ts"],
    rules: {
      // These files are vendored verbatim from shadcn@4.17.0. Keep the
      // registry source intact while applying the stricter rules to Site code.
      "@typescript-eslint/no-unused-vars": "off",
      "react-hooks/purity": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
