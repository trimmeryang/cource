module.exports = {
    extends: "eslint:recommended",
    env: {
        "browser": true,
        "commonjs": true,
        "node": true,
        "es6": true,
        "jest": true
    },
    globals: {},
    rules: {
        // 如果一个变量不会被重新赋值，则使用const声明
        // 'prefer-const': 'error',
        'prefer-const': [
            'error',
            {
                destructuring: 'all',
                ignoreReadBeforeAssign: false
            }
        ],
        'no-invalid-this': 'off',
        'no-unused-vars': 'off',
        'no-param-reassign': 'off',
        'max-params': ['off', 5],
        yoda: 'off',
        'react-hooks/rules-of-hooks': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-require-imports': 'off'
    }
};
