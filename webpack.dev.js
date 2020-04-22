const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',  // dev
  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // 开发环境下使用
            // options: {
            //   hmr: true,
            //   reloadAll: true,
            // }
          },
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
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    port: '3001', //默认是8080
    // compress: true, //是否启用 gzip 压缩
    hot: true,    // 开启HMR
    hotOnly: true,  // HMR不生效，浏览器不自动刷新
    // historyApiFallback: true   // 解决单页面路由
  }
}

module.exports = merge(baseConfig, devConfig)
