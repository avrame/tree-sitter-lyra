module.exports = {
  constrained_type: $ => seq(
    optional($.visibility),
    'type',
    alias($.user_defined_type_name, $.constrained_type_name),
    '=',
    $.type,
    optional(seq('where', $.constraints))
  ),

  constraints: $ => seq(
    '(',
    $.constraint,
    repeat(seq(',', $.constraint)),
    optional(','),
    ')'
  ),

  constraint: $ => choice(
    $.range_constraint,
    $.oneof_constraint,
    $.length_constraint, // for arrays
    $.pattern_constraint, // for strings
    $.precision_constraint, // for floats
    $.step_constraint, // for floats
  ),

  // Range constraint
  range_constraint: $ => seq('range', $.range),
  range: $ => seq(
    optional($._constraint_math_expr),
    '..',
    optional(
      seq(choice('<','='),
      $._constraint_math_expr)
    )
  ),

  // Enum constraint
  oneof_constraint: $ => seq('oneof', $.oneof),
  oneof: $ => seq($.oneof_value, repeat(seq('|', $.oneof_value))),
  oneof_value: $ => choice($.string_literal, $._number_literal),

  // Size constraint (Array)
  length_constraint: $ => seq('length ', $._constraint_math_expr),

  // Regex constraint (String)
  pattern_constraint: $ => seq('pattern', choice($.regex_literal, $.const_identifier)),

  // Precision constraint
  precision_constraint: $ => seq(
    'precision',
    $._constraint_math_expr,
    optional(
      seq(':', choice('reject', seq('round', optional($.rounding_mode))))
    )
  ),

  // Rounding mode (defaults to "nearest even")
  rounding_mode: $ => seq(
    "(",
    choice('even', 'zero', 'up', 'down', 'truncate'),
    ")"
  ),

  // Step constraint
  step_constraint: $ => seq('step', $._constraint_math_expr),
}