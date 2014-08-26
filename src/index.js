'use strict';

var genLogBoundWriter = require('./utils/genLogBoundWriter');

module.exports = {
  Application: genLogBoundWriter.bind(null,"Application"),
  Security: genLogBoundWriter.bind(null,"Security"),
  Setup: genLogBoundWriter.bind(null,"Setup"),
  System: genLogBoundWriter.bind(null,"System"),
  ForwardedEvents: genLogBoundWriter.bind(null,"Forwarded Events")
};