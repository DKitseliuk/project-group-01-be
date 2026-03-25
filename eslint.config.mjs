import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import eslintPluginImport from 'eslint-plugin-import';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      js,
      import: eslintPluginImport,
    },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
    rules: {
      semi: 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-undef': 'error',
      // додали правило для обов'язкового .js у імпортах
      'import/extensions': [
        'error',
        'always',
        { js: 'always', ignorePackages: true },
      ],
    },
  },
]);
