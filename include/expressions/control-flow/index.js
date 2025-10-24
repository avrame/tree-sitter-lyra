const if_else = require('./if_else');
const for_loop = require('./for_loop');
const for_in_loop = require('./for_in_loop');
const match = require('./match');

module.exports = {
  ...if_else,
  ...for_loop,
  ...for_in_loop,
  ...match,
}