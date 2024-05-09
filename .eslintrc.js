module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    '@typescript-eslint/eslint-plugin',
    'simple-import-sort',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'no-console': 'warn',
    'prettier/prettier': 'error',
    'arrow-parens': ['error', 'always'],
    'no-nested-ternary': 'error',
    'no-param-reassign': 'error',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
      },
    ],
    'no-extra-parens': 0,
    '@typescript-eslint/semi': [2, 'never'],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/quotes': [
      'error',
      'single',
      { allowTemplateLiterals: true },
    ],
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
  },
}
