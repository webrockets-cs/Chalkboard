const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.js',
  output: {
    path: `${__dirname}/build`,
    filename: 'bundle.js',
  },

  devServer: {
    // Need for Docker to work with dev server
    host: '0.0.0.0',
    port: 8080,
    contentBase: '/',
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/': 'http://localhost:3000',
      secure: false,
    },
    publicPath: 'http://localhost:8080/build/',
  },

  plugins: [new MiniCssExtractPlugin()],

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false',
        ],
      },
    ],
  },
};
