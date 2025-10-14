module.exports = {
  alias_type: $ => seq(
    'alias',
    alias($.user_defined_type_name, $.alias_type_name),
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
    $.enum_constraint,
    $.size_constraint, // for arrays
    $.pattern_constraint, // for strings
  ),

  // Range constraint
  range_constraint: $ => seq('range=', $.range),
  range: $ => seq(optional($._constraint_math_expr), '..', optional($._constraint_math_expr)),

  // Enum constraint
  enum_constraint: $ => seq('enum=', $.enum),
  enum: $ => seq($.enum_value, repeat(seq('|', $.enum_value))),
  enum_value: $ => choice($.string_literal, $._number_literal),

  // Size constraint (Array)
  size_constraint: $ => seq('size=', $.size),
  size: $ => seq($._constraint_math_expr),

  // Pattern constraint (String)
  pattern_constraint: $ => seq('pattern=', $.pattern),
  pattern: $ => seq($.regex_literal),
}