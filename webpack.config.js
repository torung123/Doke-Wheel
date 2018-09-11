const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIB = [
    '@shopify/polaris',
    'axios',
    'react',
    'react-dom',
    'react-redux',
    'react-router-dom',
    'redux',
    'redux-thunk'
]

module.exports = {
    entry : {
        bundle : './client/index.js'
    },
    output : {
        path: path.join(__dirname, 'assets'),
        filename : '[name].[hash].js'
    },
    module : {
        rules : [
            {
                test: /.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                use : [
                    'style-loader',
                    'css-loader'
                ],
                test : /\.css$/
            },
            {
                loader : 'file-loader',
                test : /\.jpe?g$|\.png$|\.svg$|\.woff$|\.eot$|\.ttf$/
            }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            template: 'index.html' 
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
}