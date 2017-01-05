'use strict';

var logger = new(require('..'))({
  level: 'debug',
  file: true,
  fileFolder: require('path').join(__dirname, 'logs'),
  fileLevel: 'info'
});

logger.debug('good !');
logger.info('good !');
logger.warn('good !');
logger.error('good !');