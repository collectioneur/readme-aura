import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict,
  eslintConfigPrettier,
  {
    ignores: ['dist/', 'examples/', 'node_modules/'],
  },
);
