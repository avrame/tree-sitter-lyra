module.exports = {
  boolean_expr: $ => prec(10, choice(
    prec.left(140, seq($.not, $.boolean_expr)),
    prec.left(90, seq($._math_expr, $.relational_operator, $._math_expr)),
    prec.left(80, seq($._math_expr, $.equality_operator, $._math_expr)),
    prec.left(40, seq($.boolean_expr, $.and, $.boolean_expr)),
    prec.left(30, seq($.boolean_expr, $.or, $.boolean_expr)),
  )),
  equality_operator: $ => choice(
    $.equals,
    $.not_equals,
  ),
  relational_operator: $ => choice(
    $.greater_than,
    $.less_than,
    $.greater_than_or_equals,
    $.less_than_or_equals,
  ),
  equals: $ => '==',
  not_equals: $ => '!=',
  greater_than: $ => '>',
  less_than: $ => '<',
  greater_than_or_equals: $ => '>=',
  less_than_or_equals: $ => '<=',
  and: $ => '&&',
  or: $ => '||',
  not: $ => '!',
}