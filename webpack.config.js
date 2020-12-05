module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
    libraryTarget: 'this'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  externals: {
    "create-hmac": "create-hmac",
    "url-polyfill": "url-polyfill"
  }
}