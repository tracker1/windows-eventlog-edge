var path = require('path');
var open = require('open');
var cursor = require('ansi')(process.stdout);
var fs = require('fs');

cursor.write('\n\n\n')
  .brightRed().write('!!!!!')
  .brightYellow().write(' NOTICE: Unit tests or test coverage failed ')
  .brightRed().write('!!!!!\n\n')
  .fg.reset();

var report = path.resolve(__dirname,'../coverage/lcov-report/index.html');
if (fs.existsSync(report)) open(report);