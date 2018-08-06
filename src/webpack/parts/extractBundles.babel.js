// import webpack from 'webpack'; // eslint-ignore-line
const webpack = require('webpack'); // eslint-ignore-line

module.exports = bundles => ({
  // export default bundles => ({
  plugins: bundles.map(
    bundle => new webpack.optimize.CommonsChunkPlugin(bundle)
  ),
});
