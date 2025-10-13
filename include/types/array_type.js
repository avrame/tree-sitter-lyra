module.exports = {
  array_type: $ => seq(
    'Array<',
    $.type,
    optional(
      seq(',', alias($._math_expr, $.array_capacity))
    ),
    '>'
  ),
}