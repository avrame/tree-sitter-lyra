const assignments = require('./assignments');

module.exports = {
  statement: $ => seq(
    choice(
      $.expression,
      $.declaration,
      $.const_declaration,
      $.var_reassignment,
      $.return_statement,
      $.break_statement,
      $.continue_statement,
      $.function_declaration,
      $.destructuring_declaration,
    )
  ),

  block: $ => seq('{', repeat($.statement), '}'),

  return_statement: $ => prec.right(170, seq('return', optional(field('value', $.expression)))),

  break_statement: $ => prec.right(170, seq('break', optional(field('label', $.identifier)))),

  continue_statement: $ => prec.right(170, seq('continue', optional(field('label', $.identifier)))),

  ...assignments,
}