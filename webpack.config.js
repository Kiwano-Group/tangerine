const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    resolve: {
        fallback: {
            "path": require.resolve("path-browserify")
        }
    },
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/env',
                            '@babel/react'
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                {
                    loader: 'file-loader',
                },
                ],
            },
        ]
    },
    devServer: {
        historyApiFallback: true,
        proxy: {
            '/api': {target: 'http://localhost:3000'}
        },
        static: {
            publicPath: '/',
            directory: path.resolve(__dirname, 'client')
        },
        host: 'localhost',
        port: 8080,
    },
    plugins: [
        new HtmlWebPackPlugin({
            title: 'Development',
            template: './client/index.html'
        })
    ], 
}