'use strict';

const fs = require('fs');
const path = require('path');
var mkdirp = require('mkdirp');
const winston = require('winston');
const logFolder = path.join(__dirname, '../logs');

class Logger extends winston.Logger {

  constructor(options) {
    options = options || {};
    var transports = [];
    if (options.console !== false) {
      transports.push(new(winston.transports.Console)({
        timestamp: true,
        level: options.consoleLevel || options.level || 'info'
      }));
    }
    if (options.file === true) {
      var folder = options.fileFolder || logFolder;
      if (!fs.existsSync(folder)) { mkdirp.sync(folder); }
      transports.push(new(require('winston-daily-rotate-file'))({
        filename: path.join(folder, 'log'),
        datePattern: '.dd-MM-yyyy',
        timestamp: true,
        level: options.fileLevel || options.level || 'info'
      }));
    }
    super({ level: options.level || 'info', transports });
  }

}

module.exports = Logger;