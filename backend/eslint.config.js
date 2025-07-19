import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier/flat';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config([
    globalIgnores(['dist', 'src/generated']),
    {
        files: ['src/**/*.ts'],
        plugins: {
            import: importPlugin
        },
        extends: [js.configs.recommended, tseslint.configs.recommended, prettier],
        rules: {
            'import/order': [
                'error',
                {
                    'groups': [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                        'object',
                        'type'
                    ],
                    'alphabetize': { order: 'asc', caseInsensitive: true },
                    'newlines-between': 'always'
                }
            ]
        },
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.node
        }
    }
]);
