const assignments = require('./assignments');

module.exports = {
  statement: $ => seq(
    choice(
      $.const_declaration,
      $.declaration,
      $.var_reassignment,
      $.return_statement,
      $.break_statement,
      $.continue_statement,
      $.function_definition,
      $.destructuring_declaration,
      $.expression,
    )
  ),

  block: $ => prec.left(2, seq('{', repeat($.statement), '}')),

  return_statement: $ => prec.right(170, seq('return', optional(field('value', $.expression)))),

  break_statement: $ => prec.right(170, seq('break', optional(field('label', $.identifier)))),

  continue_statement: $ => prec.right(170, seq('continue', optional(field('label', $.identifier)))),

  ...assignments,
}