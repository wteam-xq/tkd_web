var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'app/js/main.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/main.js',
    },
    module: {
        rules: [
            { test: /\.css$/, use: ["style-loader","css-loader"] },
            { test: /\.(png|jpg|gif)$/, use:"url-loader?limit=10000&name=images/[name]-[hash].[ext]"}
        ]
    }
};
