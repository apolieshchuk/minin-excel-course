const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const filename = (ext) => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader', // for compatible in old browsers
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  ];

  if (isDev) {
    // loaders.push('eslint-loader');
  }

  return loaders;
};

const jsPlugins = () => {
  const plugins = [
    new CleanWebpackPlugin(), // for clear old webpack builds
    new HTMLWebpackPlugin({ // for build html
      template: 'index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
    }),
    new CopyPlugin({ // for copy favicon on build
      patterns: [
        {from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
    new MiniCssExtractPlugin({ // for css build
      filename: filename('css'),
    }),
  ];

  if (isDev) {
    plugins.push(new ESLintPlugin());
  }

  return plugins;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'], // polyfills for async error "reference...bla-bla-bla"
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
    },
  },
  devtool: isDev ? 'source-map' : false,
  devServer: {
    port: 4200,
    hot: isDev,
  },
  plugins: jsPlugins(),
  target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist', // for [WebpackDevServer] css live reload
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i, // scss build
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
    ],
  },
};
