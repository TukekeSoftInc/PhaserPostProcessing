var webpack = require('webpack');
var path = require('path');
var GitRevisionPlugin = require('git-revision-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var WebpackShellPlugin = require('webpack-shell-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [
        path.join(__dirname, 'src/main.ts')
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'customShaders.min.js'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            pixi: path.join(__dirname, 'node_modules/phaser-ce/build/custom/pixi.min.js'),
            phaser: path.join(__dirname, 'node_modules/phaser-ce/build/custom/phaser-split.min.js'),
            p2: path.join(__dirname, 'node_modules/phaser-ce/build/custom/p2.min.js'),
            assets: path.join(__dirname, 'assets/')
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'DEBUG': false,
            'GIT_REVISION': JSON.stringify(new GitRevisionPlugin().commithash())
        }),
        new CleanWebpackPlugin([
            path.join(__dirname, 'dist')
        ]),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            screw_ie8: true,
            global_defs: {
                DEBUG: false
            }
        }),
        new HtmlWebpackPlugin({
            title: 'CustomShaders (Distribution build)',
            template: path.join(__dirname, 'templates/index.ejs')
        }),
        new CopyWebpackPlugin([
            { from: 'assets', to: 'assets' },
            { from: 'css', to: 'css' }
        ])
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        inline: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: true,
            ignored: /node_modules/
        }
    },
    module: {
        noParse: [
            /phaser-ce/
        ],
        rules: [
            { test: /assets(\/|\\)/, loader: 'file-loader?name=assets/[hash].[ext]' },
            { test: /\.ts$/, enforce: 'pre', loader: 'tslint-loader' },
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
};