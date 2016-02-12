var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'app/js/main.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/main.js',
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.(png|jpg|gif)$/, loader:"url-loader?limit=10000&name=images/[name]-[hash].[ext]"}
        ]
    }
};