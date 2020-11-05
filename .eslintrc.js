module.exports = {
  extends: [
    'eslint-config-qiwi',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  rules: {
    'sonarjs/no-duplicate-string': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-zero-fractions': 'off',
  },
}
