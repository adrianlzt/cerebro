/* eslint-disable */
const webpack = require('webpack');
const validate = require('webpack-validator');

const path = require('path');

/*
 This webpack config creates a DLL file (compiled bundle) with all the node modules code.
 Because this code does not change a lot we don't have to compile it every time some other piece of our code changes. This saves a lot of time while compiling
 */
const config = {
  debug: true,
  stats: { children: false },
  entry: {
    'nodeModules' : [
      "c3", "classlist-polyfill", "core-js", "date-format-lite", "es6-promise",
      "immutable", "lodash.isfunction", "lodash.sortby", "lodash.throttle", "picturefill",
      "pusher-js", "react", "react-css-modules", "react-dom", "react-flags", "react-google-maps",
      "react-image-lightbox", "react-on-rails", "react-redux", "react-router", "react-router-scroll",
      "redux", "redux-thunk", "reselect", "slideout", "whatwg-fetch"
    ]
  },
  output: {
    filename: '[name].debug.dll.js',
    path: path.resolve(__dirname, '../web/static/dev-dll/'),
    // The name of the global variable which the library's
    // require() function will be assigned to
    library: '[name]_lib',
  },
  plugins: [
    new webpack.DllPlugin({
      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      path: path.resolve(__dirname, '../web/static/dev-dll/[name].debug.dll.manifest.json'),
      // The name of the global variable which the library's
      // require function has been assigned to. This must match the
      // output.library option above
      name: '[name]_lib'
    }),
  ],

};

// Don't validate dev server
module.exports = validate(config, { quiet: true });
