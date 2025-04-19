import solid from "eslint-plugin-solid/configs/typescript";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier/flat";

export default tseslint.config({
  files: ["**/*.{ts,tsx}"],
  extends: [
    eslint.configs.recommended,
    tseslint.configs.recommended,
    solid,
    prettier,
  ],
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
      },
    ],
  },
});
