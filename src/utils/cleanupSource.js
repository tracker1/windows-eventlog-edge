'use strict';

function cleanupSource(parent, options) {
  if (options.source) {
    options.source = options.source.toString();
    return;
  }

  //the source wasn't specified, force the log to use "Application" log.
  options.log = "Application";

  if (parent && parent.id !== 'repl') {
    options.source = parent.filename;
    return;
  }

  //not specified, and no parent that isn't the interactive repl
  options.source = "node.exe";
}

module.exports = cleanupSource;