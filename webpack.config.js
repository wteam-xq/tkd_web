var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'app/js/main.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/main.js',
    },
    // plugins: [
    //     new SpritesmithPlugin({
    //         // 目标小图标
    //         src: {
    //             cwd: path.resolve(__dirname, 'app/images/'),
    //             glob: '*.png'
    //         },
    //         // 输出雪碧图文件及样式文件
    //         target: {
    //             image: path.resolve(__dirname, 'build/images/sprite.png'),
    //             css: path.resolve(__dirname, 'build/css/_sprite.scss')
    //             // css: path.resolve(__dirname, 'build/css/sprite.css')
    //         },
    //         // 样式文件中调用雪碧图地址写法
    //         apiOptions: {
    //             cssImageRef: '../images/sprite.png'
    //         },
    //         spritesmithOptions: {
    //             algorithm: 'top-down'
    //         }
    //     })
    // ],
    module: {
        rules: [
            { test: /\.css$/, use: ["style-loader","css-loader"] },
            { test: /\.(png|jpg|gif)$/, use:"url-loader?limit=10000&name=images/[name]-[hash].[ext]"}
        ]
    }
};
