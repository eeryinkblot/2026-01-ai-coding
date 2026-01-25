import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default [
    {
        files: ["vite.config.ts"],
        languageOptions: {
            parser: tsparser,
            globals: globals.node,
        },
    },
    {
        ignores: ["dist"],
    },
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            },
            globals: globals.browser,
        },
        plugins: {
            "@typescript-eslint": tseslint,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,

            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            "react-refresh/only-export-components": "warn",
        },
    },
];