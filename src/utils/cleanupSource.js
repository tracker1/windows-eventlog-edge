'use strict';

function cleanupSource(options) {
  if (options.source) {
    options.source = options.source.toString();
    return;
  }

  if (module && module.parent && module.parent.id !== 'repl') {
    options.source = module.parent.filename;
    return;
  }

  //not specified, and no parent that isn't the interactive repl
  options.log = "Application";
  options.source = "node.exe";
}

module.exports = cleanupSource;