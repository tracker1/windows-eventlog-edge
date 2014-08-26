'use strict';

var path = require('path');

module.exports = function getPlatformWriter(platform) {
  platform = (platform || process.platform).toString().trim().toLowerCase();

  if (platform.indexOf('win') === 0) {
    return require('edge').func(path.join(__dirname, 'writeToWindowsEventLog.cs'));
  } else {
    return require('./writeToConsole');
  }
};
