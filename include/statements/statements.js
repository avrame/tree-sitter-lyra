module.exports = {
  _statement: $ => choice(
    $.declaration,
    $.const_declaration,
    $.var_reassignment,
    $.return_statement,
    $.function_declaration,
    $.destructuring_declaration,
  ),
  
  declaration: $ => prec.left(seq(
    field('keyword', choice('let', 'var')),
    field('name', $.identifier),
    optional(field('type', $.type_notation)),
    '=',
    field('value', $.expression)
  )),

  destructuring_declaration: $ => seq(
    field('keyword', choice('let', 'var')),
    field('pattern', $.destructuring_pattern),
    '=',
    field('value', $.expression)
  ),
  
  const_declaration: $ => seq(
    field('keyword', 'const'),
    field('name', $.const_identifier),
    optional(field('type', $.type_notation)),
    '=',
    field('value', $.expression)
  ),
  
  var_reassignment: $ => seq($.identifier, '=', field('value', $.expression)),

  var_destructuring_reassignment: $ => seq(
    field('pattern', $.destructuring_pattern),
    '=',
    field('value', $.expression)
  ),

  identifier: $ => /[a-z][a-z0-9_]*/,

  const_identifier: $ => /[A-Z][A-Z0-9_]*/,

  block: $ => seq('{', repeat($._statement), '}'),

  return_statement: $ => seq('return', $.expression),
}