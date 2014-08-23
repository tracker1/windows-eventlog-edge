'use strict';

module.exports = function normalizeLog(log) {
  switch ((log || '').toString().substr(0,3).toLowerCase()) {
    case 'app': 
      return "Application";
    case 'sec': 
      return "Security";
    case 'set': 
      return "Setup";
    case 'sys': 
      return "System";
    case 'for': 
      return "Forwarded Events";
  }
  return "Application";
}