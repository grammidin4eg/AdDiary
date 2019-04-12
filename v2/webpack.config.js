// Для использования нужен Node.JS
// Поставьте webpack:
//   npm i -g webpack
// Поставьте babel-loader:
//   npm i babel-loader
// Запустите его в директории с файлами:
//   webpack

module.exports = {
    entry: './src/addiary.js',

    output: {
        filename: 'bundle.js'
    },

    mode: 'development',//development, production

    module: {
        rules: [
            { test: /\.js$/, loader: "babel-loader" }
        ]
    }
};