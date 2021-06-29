const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/main.js', // 入口, 可以为相对路径, 当然绝对路径也没错
  output: { // 输出配置
    path: path.join(__dirname, './dist'), // 输出的目录
    filename: '[name].js' // 输出的文件名
  },
  mode: 'production', // 打包的模式, production | development
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },

  // externals: {
  //   jquery: 'jQuery',
  // },
  optimization: {
    splitChunks: {
      chunks: 'all', // all, async, initial 三选一, 插件作用的chunks范围// initial只对入口文件处理
      name: 'chunk',
      cacheGroups: {
        // vendor: {
        //   test: /[\\/]node_modules[\\/]/,
        //   name: 'chunk-vendors',
        //   chunks: 'all'
        // },
        jquery: {
          name: 'chunk-jquery', // 单独将 jquery 拆包
          priority: 1, // 数字大权重到，满足多个 cacheGroups 的条件时候分到权重高的
          test: /[\\/]node_modules[\\/]_?jquery(.*)/,
        },
      },
    },
    runtimeChunk: 'single',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    open: true,
    hot: true
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'), // 源文件
      filename: 'index.html' // 输出在服务器根目录的文件名, 文件存放在内存中, 不会在磁盘上显示
    })
  ]
};