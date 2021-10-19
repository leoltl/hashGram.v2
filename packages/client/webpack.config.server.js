const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  name: 'server',
  entry: {
    server: path.resolve(__dirname, 'server/server.ts'),
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx'],
  },
  externals: [nodeExternals()],
  target: 'node',
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/plugin-transform-modules-commonjs',
                ['@babel/plugin-transform-runtime', { "regenerator": true }],
                '@emotion/babel-plugin'
              ]
            }
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.server.json',
            },
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['css-loader']
      }
    ],
  },
}