const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
  const shortEnv = env.production ? 'prod' : 'dev';
  return {
    entry: {
      content: ['./src/content'],
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
      ],
    },
    devtool: env.production ? false : 'cheap-source-map',
    mode: env.production ? 'production' : 'development',
  };
};
