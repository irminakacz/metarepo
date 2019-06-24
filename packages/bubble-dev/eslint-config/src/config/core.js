/* eslint-disable import/no-commonjs */

// https://eslint.org/docs/rules/
module.exports = {
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    'getter-return': 2,
    'no-async-promise-executor': 2,
    'no-cond-assign': 2,
    'no-dupe-args': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty': 2,
    'no-extra-boolean-cast': 2,
    'no-extra-semi': 2,
    'no-func-assign': 2,
    'no-invalid-regexp': 2,
    'no-irregular-whitespace': 2,
    'no-misleading-character-class': 2,
    'no-obj-calls': 2,
    'no-prototype-builtins': 2,
    'no-regex-spaces': 2,
    'no-sparse-arrays': 2,
    'no-unexpected-multiline': 2,
    'no-unreachable': 2,
    'no-unsafe-finally': 2,
    'no-unsafe-negation': 2,
    'require-atomic-updates': 2,
    'use-isnan': 2,
    'valid-typeof': 2,
    'block-scoped-var': 2,
    curly: 2,
    'dot-location': [2, 'property'],
    'dot-notation': 2,
    eqeqeq: [2, 'always', { null: 'ignore' }],
    'guard-for-in': 2,
    'no-alert': 2,
    'no-caller': 2,
    'no-case-declarations': 2,
    'no-else-return': 2,
    'no-empty-pattern': 2,
    'no-eval': 2,
    'no-extend-native': 2,
    'no-extra-bind': 2,
    'no-fallthrough': 2,
    'no-floating-decimal': 2,
    'no-global-assign': 2,
    'no-implicit-coercion': 2,
    'no-implied-eval': 2,
    'no-invalid-this': 2,
    'no-iterator': 2,
    'no-labels': 2,
    'no-lone-blocks': 2,
    'no-loop-func': 2,
    'no-multi-spaces': 2,
    'no-multi-str': 2,
    'no-new': 2,
    'no-new-func': 2,
    'no-new-wrappers': 2,
    'no-octal': 2,
    'no-octal-escape': 2,
    'no-param-reassign': 2,
    'no-proto': 2,
    'no-redeclare': 2,
    'no-return-assign': 2,
    'no-return-await': 2,
    'no-self-assign': 2,
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-unmodified-loop-condition': 2,
    'no-useless-call': 2,
    'no-useless-catch': 2,
    'no-useless-concat': 2,
    'no-useless-escape': 2,
    'no-useless-return': 2,
    'no-with': 2,
    'prefer-promise-reject-errors': 2,
    'require-await': 2,
    'wrap-iife': [2, 'inside'],
    yoda: 2,
    'no-delete-var': 2,
    'no-undef': 2,
    'no-undef-init': 2,
    'no-use-before-define': 2,
    'handle-callback-err': 2,
    'no-buffer-constructor': 2,
    'no-new-require': 2,
    'no-path-concat': 2,
    'no-sync': 2,
    'array-bracket-newline': [2, 'consistent'],
    'array-bracket-spacing': 2,
    'array-element-newline': [2, 'consistent'],
    'block-spacing': 2,
    'brace-style': 2,
    'comma-dangle': [2, {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
    }],
    'comma-spacing': 2,
    'comma-style': 2,
    'computed-property-spacing': 2,
    'eol-last': 2,
    'func-call-spacing': 2,
    'func-name-matching': 2,
    'function-paren-newline': [2, 'consistent'],
    'key-spacing': [2, {
      beforeColon: false,
      afterColon: true,
      mode: 'strict',
    }],
    'keyword-spacing': 2,
    'linebreak-style': 2,
    'lines-between-class-members': 2,
    'max-params': [2, 4],
    'multiline-comment-style': [2, 'separate-lines'],
    'multiline-ternary': [2, 'always-multiline'],
    'new-parens': 2,
    'newline-per-chained-call': [2, { ignoreChainWithDepth: 2 }],
    'no-array-constructor': 2,
    'no-lonely-if': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-multi-assign': 2,
    'no-multiple-empty-lines': [2, { max: 1 }],
    'no-nested-ternary': 1,
    'no-new-object': 2,
    'no-trailing-spaces': 2,
    'no-unneeded-ternary': 2,
    'no-whitespace-before-property': 2,
    'object-curly-newline': [2, {
      consistent: true,
      multiline: true,
    }],
    'object-curly-spacing': [2, 'always', {
      arraysInObjects: true,
      objectsInObjects: true,
    }],
    'object-property-newline': [2, {
      allowAllPropertiesOnSameLine: true,
    }],
    'one-var': [2, 'never'],
    'one-var-declaration-per-line': [2, 'always'],
    'padded-blocks': [2, 'never'],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: 'import',
        next: '*',
      },
      {
        blankLine: 'never',
        prev: 'import',
        next: 'import',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'export',
      },
      {
        blankLine: 'any',
        prev: 'export',
        next: 'export',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
      {
        blankLine: 'always',
        prev: [
          'const',
          'let',
          'var',
        ],
        next: [
          'block',
          'block-like',
        ],
      },
      {
        blankLine: 'always',
        prev: [
          'block',
          'block-like',
        ],
        next: [
          'const',
          'let',
          'var',
        ],
      },
      {
        blankLine: 'always',
        prev: [
          '*',
        ],
        next: [
          'break',
        ],
      },
      {
        blankLine: 'any',
        prev: [
          'const',
          'let',
          'var',
        ],
        next: [
          'const',
          'let',
          'var',
        ],
      },
      {
        blankLine: 'always',
        prev: [
          'block',
          'function',
        ],
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: [
          'block',
          'function',
        ],
      },
    ],
    'prefer-object-spread': 2,
    'quote-props': [2, 'as-needed'],
    quotes: [2, 'single', { allowTemplateLiterals: true }],
    semi: [2, 'never'],
    'sort-vars': 2,
    'space-before-blocks': 2,
    'space-before-function-paren': [2, {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always',
    }],
    'space-in-parens': [2, 'never'],
    'space-infix-ops': 2,
    'space-unary-ops': [2, {
      words: true,
      nonwords: false,
    }],
    'switch-colon-spacing': [2, {
      after: true,
      before: false,
    }],
    'template-tag-spacing': [2, 'never'],
    'unicode-bom': [2, 'never'],
    'arrow-parens': [2, 'always'],
    'arrow-spacing': [2, {
      before: true,
      after: true,
    }],
    'generator-star-spacing': [2, {
      before: true,
      after: false,
    }],
    'no-confusing-arrow': [2, { allowParens: true }],
    'no-const-assign': 2,
    'no-new-symbol': 2,
    'no-useless-computed-key': 2,
    'no-var': 2,
    'object-shorthand': [2, 'always'],
    'prefer-arrow-callback': [2, {
      allowNamedFunctions: false,
      allowUnboundThis: true,
    }],
    'prefer-const': 2,
    'prefer-numeric-literals': 2,
    'prefer-rest-params': 2,
    'prefer-spread': 2,
    'prefer-template': 2,
    'require-yield': 2,
    'rest-spread-spacing': [2, 'never'],
    'template-curly-spacing': 2,
    'yield-star-spacing': [2, {
      before: false,
      after: true,
    }],
  },
}
