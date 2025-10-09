module.exports = {
  expression: $ => choice($._math_expression, $._literal, $.array_spread, $.function_call),
}