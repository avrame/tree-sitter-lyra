const array_literal = require('./array');
const struct_literal = require('./struct');
const map_literal = require('./map');
const number_literals = require('./numbers');
const tuple_literal = require('./tuple');

module.exports = {
  _literal: $ => prec.right(
    1,
    choice(
      $._number_literal,
      $.boolean_literal,
      $.regex_literal,
      $.string_literal,
      $.array_literal,
      $.struct_literal,
      $.map_literal,
    )
  ),
  ...array_literal,
  ...struct_literal,
  ...map_literal,
  ...number_literals,
  ...tuple_literal,
  
  string_literal: $ => token(seq('"', repeat(choice(/[^"\\\n]+/, /\\./)), '"')),

  boolean_literal: $ => token(choice('true', 'false')),

  regex_literal: $ => /r\/[^\/\\]*(?:\\.[^\/\\]*)*\//,

  generic_arguments: $ => seq(
    '<',
      $.type, repeat(seq(',', $.type)), optional(','),
    '>'
  ),
}