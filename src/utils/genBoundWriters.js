'use strict';

var genWriter = require('./genWriter');

function genBoundWriters(log, source) {
  return {
    info: genWriter(log,source,"Information"),
    warn: genWriter(log,source,"Warning"),
    error: genWriter(log,source,"Error"),
    success: genWriter(log,source,"SuccessAudit"),
    failure: genWriter(log,source,"FailureAudit")
  };
}

module.exports = genBoundWriters;