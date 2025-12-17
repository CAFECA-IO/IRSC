import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [".next/", "node_modules/"]
  },
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    rules: {
      "no-console": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unused-vars": "warn"
    }
  }
];
