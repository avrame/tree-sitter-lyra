module.exports = {
  array_comprehension: $ => prec(2, seq(
    '[',
    $._generators,
    optional(seq('|', $._guards)),
    '|',
    $.result_expression,
    ']',
  )),

  _generators: $ => seq(
    $.generator,
    repeat(seq(',', $.generator)),
    optional(','),
  ),
  generator: $ => seq(
    choice($.range_expression, $.array_literal, $.string_literal),
    '->',
    $.identifier,
  ),

  _guards: $ => seq(
    $.comprehension_guard,
    repeat(seq(',', $.comprehension_guard)),
    optional(','),
  ),
  comprehension_guard: $ => choice($.boolean_expr, $.call_expression, $.identifier),

  result_expression: $ => choice(
    $._math_expr,
    $.identifier,
    $.tuple_literal,
    $.struct_literal,
    $.array_literal,
  ),
}