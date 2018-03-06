const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptmizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const cssnano = require('cssnano');
const webpack = require('webpack');

let plugins = [];
const isProd = process.env.NODE_ENV == 'production';

if (isProd) {
  plugins.push(
    new OptmizeCssAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      }
    })
  );

  plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
}

plugins.push(
  new HtmlPlugin({
    minify: {
      html5: true,
      collapseWhitespace: true,
      removeComments: true
    },
    hash: true,
    filename: 'index.html',
    template: `${__dirname}/main.html`
  })
);
plugins.push(new ExtractTextPlugin('styles.css'));
plugins.push(
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  })
);

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader',
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  plugins: plugins,
  optimization: {
    minimize: isProd,
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  }
};
