'use strict';

var genBoundWriters = require('./utils/genBoundWriters');
var writeLog = require('./write-log');

function EventLog(){
  writeLog.apply(null, arguments);
}

EventLog.Application = genBoundWriters.bind(null,"Application");
EventLog.Security = genBoundWriters.bind(null,"Security");
EventLog.Setup = genBoundWriters.bind(null,"Setup");
EventLog.System = genBoundWriters.bind(null,"System");
EventLog.ForwardedEvents = genBoundWriters.bind(null,"Forwarded Events");

module.exports = EventLog;