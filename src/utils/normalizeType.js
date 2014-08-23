'use strict';

module.exports = function normalizeLog(logEntryType) {
  switch ((logEntryType || '').toString().toLowerCase()[0]) {
    case 'e': 
      return "Error";
    case 'w': 
      return "Warning";
    case 's': 
      return "SuccessAudit";
    case 'f': 
      return "FailureAudit";
    default: // i
      return "Information";
  }
}