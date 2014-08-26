'use strict';

var console = require('console');
var cleanupOptions = require('../utils/cleanupOptions');
var write = require('./getPlatformWriter')(process.platform);

function writeLog(options, callback) {
  if (!options) throw new Error('The options argument is required.');

  //normalize the callback
  if (typeof callback !== 'function') callback = function(err){
    if (err) console.error(err);
  };

  //if options isn't an object, treat it like the message
  if (typeof(options) !== 'object') {
    options = { message: options.toString() };
  }

  options = cleanupOptions(options);
  //console.log(options);

  //options isn't an object, nothing to do.
  if (!options.message) {
    return callback(new Error('The options argument must have a message property.'), {success:false});
  }

  write(options, callback);
}

module.exports = writeLog;
