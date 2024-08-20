import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { Configuration, ProgressPlugin } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';

const dist = path.join(__dirname, 'dist');

const webpackConfig: Configuration & { devServer?: DevServerConfiguration } = {
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: dist,
    publicPath: '/',
  },

  devServer: {
    static: dist,

    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    open: false,
  },

  entry: path.join(__dirname, 'RedBlackTreeVisualizer.tsx'),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /\.test\.tsx?$/,
      },
    ],
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      filename: path.join(dist, 'index.html'),
      inject: 'body',
    }),
  ],

  stats: {
    colors: true,
  },

  optimization: {
    runtimeChunk: false,
    splitChunks: false,
    usedExports: false,
  },
};

export default webpackConfig;
