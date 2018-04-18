'use strict'
const table = require('../table');

module.exports = () => {
  table(require('../../templates'));
  process.exit();
};
