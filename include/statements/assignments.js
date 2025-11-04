module.exports = {
  const_declaration: $ => prec.left(choice(
    seq(
      field('keyword', 'const'),
      field('name', $.const_identifier),
      field('type', $.type_notation),
      '=',
      field('value', $.expression)
    ),
    seq(
      field('keyword', 'const'),
      field('name', $.const_identifier),
      '=',
      field('value', $.expression)
    )
  )),

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

  var_reassignment: $ => seq($.identifier, '=', field('value', $.expression)),

  var_destructuring_reassignment: $ => seq(
    field('pattern', $.destructuring_pattern),
    '=',
    field('value', $.expression)
  ),
}