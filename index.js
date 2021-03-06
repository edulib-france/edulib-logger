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
        level: options.consoleLevel || options.level || 'info',
        label: options.label
      }));
    }
    if (options.file === true) {
      var folder = options.fileFolder || logFolder;
      if (!fs.existsSync(folder)) { mkdirp.sync(folder); }
      transports.push(new(require('winston-daily-rotate-file'))({
        filename: path.join(folder, 'log'),
        datePattern: '.dd-MM-yyyy',
        timestamp: true,
        level: options.fileLevel || options.level || 'info',
        label: options.label
      }));
    }
    super({ level: options.level || 'info', transports });
  }

  expressLogger(options) {
    options = options || {};
    return (req, res, next) => {
      var data = { url: req.originalUrl, ip: req.ip };
      if (options.uuid) { data[options.uuid] = req[options.uuid]; }
      this.info(options.msg || 'express request', data);
      next();
    };
  }

}

module.exports = Logger;