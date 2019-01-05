const webpack = require('webpack');
const CleanWebPackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const commonPaths = require('./common-paths');

const config = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: commonPaths.outputPath
    },
    module: {
        rules: [

            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                use: ['css-hot-loader'].concat(ExtractTextWebpackPlugin.extract({
                  fallback: 'style-loader',
                  use: [
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
                })),
              },
            {
              test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/,
              loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new ExtractTextWebpackPlugin('styles.css'),
        new webpack.optimize.CommonsChunkPlugin({
            filename: 'common.js',
            minChunks: 3,
            name: 'common'
        }),
        new CleanWebPackPlugin(['public'], { root: commonPaths.root }),
        new HtmlWebPackPlugin({
            template: commonPaths.template,
            favicon: commonPaths.favicon,
            inject: true
        })
    ]
};

module.exports = config;