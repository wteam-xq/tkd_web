var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'js/main.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/main.js',
    }
};