import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // Enforce no unused variables
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }],
      
      // Disallow console.log in production
      "no-console": ["warn", { 
        allow: ["warn", "error"] 
      }],
      
      // Enforce === and !== over == and !=
      "eqeqeq": ["error", "always"],
      
      // Disallow undeclared variables
      "no-undef": "error",
      
      // Disallow var declarations
      "no-var": "error",
      
      // Prefer const when variables are never reassigned
      "prefer-const": ["error", {
        "destructuring": "any",
        "ignoreReadBeforeAssign": false
      }],
      
      // Require consistent return statements
      "consistent-return": ["error", {
        "treatUndefinedAsUnspecified": true
      }],
      
      // Disallow empty functions
      "no-empty-function": ["error", {
        "allow": [
          "arrowFunctions",
          "functions",
          "methods"
        ]
      }],

      // Additional best practices
      "no-debugger": "warn",
      "no-duplicate-imports": "error",
      "no-unused-expressions": "error",

      // Enforce one component per file
      "import/no-duplicates": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/order": ["error", {
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always",
        "alphabetize": { "order": "asc" }
      }],

      // Custom rule for component file line limit
      "max-lines": ["warn", {
        "max": 300,
        "skipBlankLines": true,
        "skipComments": true
      }],

      // Enforce one component per file (React specific)
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-pascal-case": "error",
      "react/jsx-sort-props": ["warn", {
        "callbacksLast": true,
        "shorthandFirst": true,
        "ignoreCase": true,
        "reservedFirst": true
      }]
    }
  }
];

export default eslintConfig;
