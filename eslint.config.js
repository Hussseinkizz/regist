import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'], // Main source files
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json', // Project-specific settings
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      'prettier/prettier': 'error',
      'no-console': 'warn',
      'no-debugger': 'warn',
    },
  },
  {
    files: ['tests/**/*.ts', '*.config.ts'], // Test and config files
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2020, // Standard parsing without the project setting
        sourceType: 'module',
      },
    },
    rules: {
      // Define any specific rules for these files, or leave as is
    },
  },
];
