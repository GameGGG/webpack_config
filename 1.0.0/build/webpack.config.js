let webpack = require('webpack')
let path = require('path')
let cleanWebpackPlugin = require('clean-webpack-plugin')
let extractTextWebpackPlugin = require('extract-text-webpack-plugin')
let copyWebpackPlugin = require('copy-webpack-plugin')
const infoConfig = require('./../config/info.config.js')
const util = require('./util.js')
module.exports = {
    entry: util.getEntry(infoConfig),
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, './../dist/js'),
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: extractTextWebpackPlugin.extract('css-loader', 'style-loader'),
            },
            {
                test: /\.(jpg|png|jpeg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        name: '../images/[name].[hash:7].[ext]'
                    }
                }],
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src']
                    }
                }]
            }
        ]
    },
    devServer: {
        contentBase: '../'
    },
    plugins: [
        new cleanWebpackPlugin(
            ['dist/*'],
            {
                root: path.resolve(__dirname, '../'),
                dry: false
            }
        ),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: '[name].[chunkhash].js'
        }),
        new extractTextWebpackPlugin({
            filename:'../css/[name].[contenthash:7].css'
        }),
        new copyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../src/static'),
                to: '../static',
                ignore: ['.*']
            }
        ])
    ].concat(util.getHtmlDealPlugin(infoConfig))
}