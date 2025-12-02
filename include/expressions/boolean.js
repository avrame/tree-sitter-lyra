module.exports = {
  boolean_expr: $ => prec(10, choice(
    prec.left(140, seq($.not, $.expression)),
    prec.left(90, seq($._math_expr, $._relational_operator, $._math_expr)),
    prec.left(80, seq($._math_expr, $._equality_operator, $._math_expr)),
    prec.left(40, seq($.boolean_expr, $.and, $.boolean_expr)),
    prec.left(30, seq($.boolean_expr, $.or, $.boolean_expr)),
  )),

  _equality_operator: $ => choice($.equals_operator, $.not_equals_operator),
  equals_operator: $ => '==',
  not_equals_operator: $ => '!=',

  _relational_operator: $ => choice(
    $.greater_than_operator,
    $.less_than_operator,
    $.greater_than_or_equal_operator,
    $.less_than_or_equal_operator,
  ),
  greater_than_operator: $ => '>',
  less_than_operator: $ => '<',
  greater_than_or_equal_operator: $ => '>=',
  less_than_or_equal_operator: $ => '<=',

  and: $ => token('&&'),
  or: $ => token('||'),
  not: $ => token('!'),
}