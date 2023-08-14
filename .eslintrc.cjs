module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    extraFileExtensions: ['.svelte'], // This is a required setting in `@typescript-eslint/parser` v4.24.0.
  },
  plugins: ['@typescript-eslint', 'svelte'],
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:svelte/recommended',
  ],
  ignorePatterns: ['*.cjs', 'dist/**', 'build/**', '.svelte-kit/**', 'svelte.config.js'],
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser', // Parse the `<script>` in `.svelte` as TypeScript by adding the following configuration.
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'svelte/no-at-html-tags': 'warn',
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
}
