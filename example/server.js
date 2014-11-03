var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = require('./webpack.config');

var options = {
  publicPath: config.output.publicPath,
  hot: true
};

new WebpackDevServer(webpack(config), options)
  .listen(3000, 'localhost', function (err, result) {
    if (err) console.error(err);
  });
