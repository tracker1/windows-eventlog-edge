'use strict';

module.exports = function normalizeLog(log) {
  switch ((log || '').toString().substr(0,3).toLowerCase()) {
    case 'sec': 
      return "Security";
    case 'set': 
      return "Setup";
    case 'sys': 
      return "System";
    case 'for': 
      return "Forwarded Events";
    //case 'app': 
    //  return "Application";
  }

  //default to "Application"
  return "Application";
}