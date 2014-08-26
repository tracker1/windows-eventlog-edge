'use strict';

/*
function getWriteMethod(type) {
    case 'e': 
      return console.error;
    case 'w': 
      return console.warn;
    case 's': 
      return console.log;
    case 'f': 
      return console.error;
    default: // i
      return console.info;
}
*/
var console = require('console');

function writeToConsole(options, callback) {
  //var write = getWriteMethod(options.type);
  console.log('%s\t%s\t%s\t%s\t%s', options.type, new Date().toISOString(), options.log, options.source, options.message);
  if (typeof callback === 'function') callback(null, null);
}

module.exports = writeToConsole;