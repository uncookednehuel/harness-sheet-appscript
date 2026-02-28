import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import { createRequire } from 'node:module';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

const require = createRequire(import.meta.url);
const gtsConfig = require('gts/build/eslint.config.js');

export default defineConfig([
  globalIgnores([
    'template/**/*',
    'template-ui/**/*',
    '**/node_modules/*',
    'build/*',
    '**/dist/*',
    '**/testing',
  ]),
  ...gtsConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
      },
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': 'off'
    },
  },
  prettierConfig,
]);
