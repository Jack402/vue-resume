const path = require('path');

const baseCfg = require('./webpack.base.config');

const merge = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = merge(baseCfg, {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js'
    },
    devtool: false,
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            root: path.resolve('./')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    safe: true
                },
            })
        ]
    }
})
