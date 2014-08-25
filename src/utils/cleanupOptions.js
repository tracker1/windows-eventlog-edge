'use strict';

var clone = require('safe-clone-deep');
var cleanupSource = require('./cleanupSource');
var normalizeLog = require('./normalizeLog');
var normalizeType = require('./normalizeType');
var normalizeMessage = require('./normalizeMessage');

function cleanupOptions(options) {
  var ret = clone(options);
  cleanupSource(ret);
  ret.log = normalizeLog(ret.log);
  ret.type = normalizeType(ret.type);
  ret.message = normalizeMessage(ret.message);
  return ret;
}

module.exports = cleanupOptions;