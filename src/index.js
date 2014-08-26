'use strict';

var genBoundWriters = require('./utils/genBoundWriters');

module.exports = {
  Application: genBoundWriters.bind(null,"Application"),
  Security: genBoundWriters.bind(null,"Security"),
  Setup: genBoundWriters.bind(null,"Setup"),
  System: genBoundWriters.bind(null,"System"),
  ForwardedEvents: genBoundWriters.bind(null,"Forwarded Events")
};