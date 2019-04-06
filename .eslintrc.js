module.exports = {
    env: {
        browser: true,
        // es6: true,
    },
    extends: 'airbnb',
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    rules: {
        // 换行符CRLF
        'linebreak-style': ['error', 'windows'],
        // 文件名可以用js或jsx
        'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
        // 单引号
        'quotes': [2, 'single'],
        // 缩进
        'indent': ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        // 纯函数组件
        'react/prefer-stateless-function': 0,
        // 默认值
        'react/prop-types': 0,
        // 可以使用数组下标作为key
        'react/no-array-index-key': 0,
        // 不受最大行数限制
        'max-len': 0,
        // 一行可以有多个表达式
        'react/jsx-one-expression-per-line': 0,
        'react/jsx-closing-tag-location': 0,
        // 对象过长可不换行
        'object-curly-newline': 0,
    },
};
