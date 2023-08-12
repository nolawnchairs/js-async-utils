module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.lint.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
  ],
  extends: [
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'eol-last': 'error',
    'new-parens': 'error',
    'no-return-await': 'error',
    'no-trailing-spaces': 'error',
    'prefer-template': 'error',
    'no-multi-spaces': 'error',
    'no-var': 'error',
    'no-console': 'warn',
    'spaced-comment': ['warn', 'always'],
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
      },
    ],
    '@typescript-eslint/indent': [
      'error',
      2,
      {
        SwitchCase: 1,
        FunctionExpression: { parameters: 'first' },
        ignoredNodes: [
          'FunctionExpression > .params[decorators.length > 0]',
          'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
          'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
        ],
      }
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 0,
        maxBOF: 1,
      },
    ],
    '@typescript-eslint/no-unused-vars': ['error', { 'ignoreRestSiblings': true }],
    '@typescript-eslint/comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        enums: 'always',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
    '@typescript-eslint/quotes': ['error', 'single'],
    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    '@typescript-eslint/no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['.*'],
            message: 'Relative imports not allowed. Use module aliasing',
          },
        ],
      },
    ],
  },
}
