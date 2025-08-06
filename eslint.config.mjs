// @ts-check
import tsEslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';
import * as reactPluginHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default tsEslint.config(
{
  ignores: ['build/*', '.yarn/'],
},
  tsEslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/adjacent-overload-signatures': 'off',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      'no-console': 'off',
    },
    // is required only for `@typescript-eslint/no-floating-promises`
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  getPrettierLinting(),
  getReactLinting()
);

function getPrettierLinting() {
  return {
    ...prettierConfig,
    files: ['**/*.{js,ts,tsx}'],
    rules: {
      ...prettierConfig.rules,
      quotes: [1, 'single', 'avoid-escape'],
      'spaced-comment': ['error', 'always'],
      curly: ['error', 'all'],
    },
  };
}

function getReactLinting() {
  return {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      ...reactPlugin.configs.flat.recommended.plugins,
      'react-hooks': reactPluginHooks,
    },
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
      },
    },
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactPluginHooks.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/display-name': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/no-unescaped-entities': 'off',
      'react/jsx-curly-brace-presence': [
        'warn',
        {
          children: 'never',
          props: 'never',
          propElementValues: 'always',
        },
      ],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react/no-unknown-property': ['off'],
    },
  };
}
