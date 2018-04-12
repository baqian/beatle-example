var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractTextPlugin = new ExtractTextPlugin('[name].css');
var webpackOpts = {
  entry: {
    app: './index.jsx'
  },
  output: {
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['env', 'react'],
            plugins: [
              'transform-decorators-legacy',
              'transform-class-properties',
              'add-module-exports',
              'transform-object-rest-spread',
              [path.resolve(__dirname, 'node_modules/babel-plugin-transform-runtime'), {
                polyfill: false,
                regenerator: true
              }],
              [path.resolve(__dirname, 'node_modules/babel-plugin-transform-async-to-module-method'), {
                module: 'bluebird',
                method: 'coroutine'
              }]
            ],
          }
        }
      },
      {
        test: /\.(js|jsx)$/,
        use: ['source-map-loader'],
        enforce: 'pre'
      },
      // css加载器,支持css,less,sass
      {
        test: /\.css$/,
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          // resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader']
        })
      },
      {
        test: /\.less$/,
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          // resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'less-loader']
        })
      },
      // 支持读取图片
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/'
          }
        }
      },
      // 支持icon
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }
      }
    ]
  },
  // 开发者工具
  // cheap-eval-source-map 打开source
  // inline-source-map 调试的时候需要，为每个文件加一个sourcemap的DataUrl，ps：是打包前的每个文件
  devtool: '#cheap-source-map',
  plugins: [
    extractTextPlugin,
    new webpack.ProgressPlugin(),
    // css抽离插件，同时支持css,less,sass
    // define插件，可以做环境变量，代码切分等功能(这里需要拓展)
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')}),
    // 把静态资源注入html的plugins
    new HtmlWebpackPlugin({template: path.resolve(__dirname, './index.html')}),
    // 代码压缩插件
    // new webpack.optimize.UglifyJsPlugin({sourceMap: true}),
    // js抽离逻辑
    new webpack.optimize.CommonsChunkPlugin({names: ['public', 'vendor'], minChunks: 2}),
  ],
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    open: true
  }
};

module.exports = webpackOpts;
