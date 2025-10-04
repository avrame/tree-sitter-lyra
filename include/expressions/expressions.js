module.exports = {
  expression: $ => choice($._math_expression, $._literal),
}