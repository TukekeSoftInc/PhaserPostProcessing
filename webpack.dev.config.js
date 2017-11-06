var webpack = require('webpack');
var path = require('path');
var GitRevisionPlugin = require('git-revision-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var WebpackShellPlugin = require('webpack-shell-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
    entry: [
        path.join(__dirname, 'src/main.ts')
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'customShaders.js'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            pixi: path.join(__dirname, 'node_modules/phaser-ce/build/custom/pixi.js'),
            phaser: path.join(__dirname, 'node_modules/phaser-ce/build/custom/phaser-split.js'),
            p2: path.join(__dirname, 'node_modules/phaser-ce/build/custom/p2.js'),
            assets: path.join(__dirname, 'assets/')
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'DEBUG': true,
            'GIT_REVISION': JSON.stringify(new GitRevisionPlugin().commithash())
        }),
        new CleanWebpackPlugin([
            path.join(__dirname, 'dist')
        ]),
        new HtmlWebpackPlugin({
            title: 'CustomShaders (Dev build)',
            template: path.join(__dirname, 'templates/index.ejs')
        }),
        new CopyWebpackPlugin([
            { from: 'assets', to: 'assets' },
            { from: 'css', to: 'css' }
        ]),
        new WriteFilePlugin()
    ],
    devServer: {
        contentBase: [path.join(__dirname, 'dist')],
        compress: true,
        port: 9000,
        inline: true,
        overlay: {
            warnings: true,
            errors: true
        },
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
}