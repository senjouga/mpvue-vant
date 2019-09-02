const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
// var HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// copy from ./webpack.prod.conf.js
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      extract: true
    })
  },
  devtool: config.dev.sourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('[name].js'),
    chunkFilename: utils.assetsPath('[id].js')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // copy from ./webpack.prod.conf.js
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('[name].wxss')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common/vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf('node_modules') >= 0
        ) || count > 1
      }
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common/webim', //新打包文件名
    //   chunks: ['common/vendor'], //拆分模块名
    //   minChunks: function (module, count) {
    //     // console.log(module.resource + count)
    //     // 以下是拆分规则，返回true 则拆分，以下规则是将 libs 下的文件单独打包
    //     return (
    //       module.resource &&
    //       /\.js$/.test(module.resource) &&
    //       (
    //         module.resource.indexOf('libs') >= 0 ||
    //         module.resource.indexOf('service') >= 0 ||
    //         module.resource.indexOf('adapter') >= 0 ||
    //         module.resource.indexOf('config') >= 0 ||
    //         module.resource.indexOf('mixins') >= 0 ||
    //         module.resource.indexOf('utils') >= 0
    //       )
    //     )
    //   }
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common/manifest',
      chunks: ['common/vendor']
    }),

    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
})
