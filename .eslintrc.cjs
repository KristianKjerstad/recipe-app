module.exports = {
    root: true,
    env: { browser: true, es6: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'no-magic-numbers': [
            'error',
            { ignore: [0, 1, 2, 3], ignoreArrayIndexes: true },
        ],
    },
}
