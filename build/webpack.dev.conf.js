'use strict'

const fs = require('fs')
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      serviceWorkerLoader: `<script>${fs.readFileSync(path.join(__dirname,
        './service-worker-dev.js'), 'utf-8')}</script>`
    }),
    new FriendlyErrorsPlugin(),
    // service worker caching
    new WorkboxPlugin.GenerateSW({
      swDest: '/service-worker.js',
      navigateFallback: '/index.html',
      navigateFallbackBlacklist: [/auth/],
      clientsClaim: true,
      skipWaiting: true,
      // Exclude images from the precache
      exclude: [/\.(?:mp3)$/],
      // Define runtime caching rules.
      runtimeCaching: [
        {
          // Match any request ends with .png, .jpg, .jpeg or .svg.
          urlPattern: /full\/gita.*\.mp3$/,
          // Apply a cache-first strategy.
          handler: 'cacheFirst',
          options: {
            cacheName: 'my-mp3-cache',
            // Only cache 10 images.
            expiration: {
              maxEntries: 5,
              maxAgeSeconds: 5*365*24*60*60
            },
          },
        },
        {
          // Match any request ends with .png, .jpg, .jpeg or .svg.
          urlPattern: /.*(?:googleapis|gstatic|cdn\.firebase)\.com.*$/,
          // urlPattern: /\.jpeg$/,
          // Apply a cache-first strategy.
          handler: 'cacheFirst',
          options: {
            cacheName: 'my-lib-cache',
            // Only cache 10 images.
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 5*365*24*60*60
            },
          },
        },
      ],
    })
  ]
})
