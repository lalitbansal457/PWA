const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "./", 'index.html'),
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    mode: "development",
    entry: ["./index.html"],
    output: {
        filename: "bundle.js"
    },
    devServer: {
        watchContentBase: true,
        port: 8081,
       // https: true,
        host: '0.0.0.0'
    },
    module: {
        rules: [

            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: "/images"
                }
            },

            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },

            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                }
            }


        ]
    },
    plugins: [HTMLWebpackPluginConfig]
}