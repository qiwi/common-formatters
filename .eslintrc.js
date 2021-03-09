module.exports = {
  extends: [
    'eslint-config-qiwi',
    'prettier',
  ],
  rules: {
    'sonarjs/no-duplicate-string': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-zero-fractions': 'off',
  },
}
