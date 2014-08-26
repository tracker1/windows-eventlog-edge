'use strict';

var writeLog = require('../write-log');

/*log, source, type, message*/
function genWriter(log, source, type) {
  return function logWriter() {
    writeLog({
      log:log,
      source:source,
      type:type,
      message: arguments.length < 2 ? arguments[0] : Array.prototype.slice.call(arguments)
    });
  };
}

module.exports = genWriter;