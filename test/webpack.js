const webpack = require('webpack')
const path = require('path')

webpack({
  mode: 'development',
  experiments: {
    outputModule: true
  },
  context: __dirname,
  entry: {
    main: [path.join(__dirname, 'index.mjs')]
  },
  output: {
    chunkFormat: 'module',
    module: true,
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].mjs'
  },
  devtool: false,
  target: 'node',
  module: {
    rules: [
      // ...
      {
        test: /\.node$/,
        use: [
          {
            loader: require.resolve('..'),
            options: {
              name: 'relative/to/output/path/[name]-[contenthash:8].[ext]', // default: '[name].[ext]'
              from: 'js' // default: '.'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.node']
  }
}, function (err, stats) {
  if (err) {
    console.error(err)
    return
  }
  console.log(stats.toString({ colors: true }))
})
