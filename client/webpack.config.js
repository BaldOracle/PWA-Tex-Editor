const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Generate index.html
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body'
      }),

      // Generate manifest.json
      new WebpackPwaManifest({
        name: 'My Notes App',
        short_name: 'Notes App',
        description: 'A simple notes app for developers',
        start_url: './index.html',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
          {
            src: path.resolve('./src/assets/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons')
          }
        ]
      }),

      // Generate service worker
      new InjectManifest({
        swSrc: './src/sw.js',
        swDest: 'sw.js',
        exclude: [/\.DS_Store$/],
      }),
    ],

    module: {
      rules: [
        // CSS loader
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },

        // Babel loader
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
