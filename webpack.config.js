const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  const shortEnv = env.production ? 'prod' : 'dev';
  return {
    entry: {
      content: ['./src/content', './src/content/index.scss'],
      background: ['./src/background'],
      options: ['./src/options'],
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new CopyWebpackPlugin([
        { from: `src/manifest.${shortEnv}.json`, to: 'manifest.json' },
        { from: 'icons', to: 'icons' },
        { from: 'src/options/index.html', to: 'options.html' },
      ]),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },
    devtool: env.production ? false : 'cheap-module-eval-source-map',
    mode: env.production ? 'production' : 'development',
  };
};
