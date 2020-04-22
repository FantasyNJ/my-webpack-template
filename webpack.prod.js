const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const baseConfig = require('./webpack.base')

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'), //必须是绝对路径
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/,
        use: [
          'style-loader', // 开发模式下
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')()
                ]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              // sass-loader 8.0.0 之后fibers将会自动引入
              implementation: require('sass'),
            },
          }],
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    // 抽离css文件
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',   // 直接放到html中走filename
      chunkFilename: '[name].[contenthash].chunk.css'   // 被js文件引用的走chunkFilename
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({})  // 压缩css
    ]
  },
}

module.exports = merge(baseConfig, prodConfig)
