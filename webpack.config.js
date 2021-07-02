const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ChangeVersion = require('./config/plugin/changeVersion');//更改版本号
const webpack = require('webpack');
/*自定义插件--Loader*/

let version = 0;
ChangeVersion((v) => version = v);

const PluginsTemp = class PluginsTemp {
  
  constructor(doneCallback, failCallback) {
    console.log('constructor')

  }

  apply(compiler) {
    

    compiler.hooks.afterCompile.tap('abc', (compilation,callback) => {

      console.log('*****************', process.env.NODE_ENV);
      // 在你想要触发钩子的位置/时机下调用……
      
      console.log(compilation.options.plugins);
      return compilation;
      
    });
  }
}

module.exports = {
  target: 'web',
  entry: './src/main.js', // 入口, 可以为相对路径, 当然绝对路径也没错
  output: { // 输出配置
    path: path.join(__dirname, './dist'), // 输出的目录
    filename: `[name]_${version}.js` // 输出的文件名
  },
  devtool: 'cheap-module-source-map',//hidden-source-map source-map
  mode: 'development', // 打包的模式, production | development
  module: {
    rules: [{
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', { loader: 'demo-loader', options: { query: 'query-test' } }]//,
    }, {
      test: /\.js$/,
      exclude: path.resolve(__dirname, 'node_modules'),
      // use: [{loader:'demo-loader',options:{query:'query-test'}}]
    }]
  },

  //告诉 Webpack 要构建的代码中使用了哪些不用被打包的模块，也就是说这些模版是外部环境提供的，Webpack 在打包时可以忽略它们
  externals: {
    jquery: 'jQuery',
  },
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
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'config/loader')]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    headers: {
      'X-foo': 'bar'
    },
    compress: true,
    port: 9000,
    host: '0.0.0.0',
    open: false,
    hot: true
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify("development"),
      }
    }),

    new PluginsTemp(),

    new MiniCssExtractPlugin({
      filename: `style/[name]_${version}.css`,
      chunkFilename: `chunk/[name]_${version}.css`,
      ignoreOrder: true,
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'), // 源文件
      filename: 'index.html' // 输出在服务器根目录的文件名, 文件存放在内存中, 不会在磁盘上显示
    }),
    new CleanWebpackPlugin()
  ]
};