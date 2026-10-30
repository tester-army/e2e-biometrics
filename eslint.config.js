const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*', 'ios/*', 'android/*', '.e2e/*'],
  },
  {
    // An e2e fixture hands its value to `use`, which this rule mistakes for React's `use()`.
    files: ['tests/**'],
    rules: { 'react-hooks/rules-of-hooks': 'off' },
  },
]);
