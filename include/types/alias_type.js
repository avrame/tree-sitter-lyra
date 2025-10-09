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

  constraint: $ => choice($.range_constraint, $.enum_constraint),

  range_constraint: $ => seq('range=', $.range),

  enum_constraint: $ => seq('enum=', $.enum),

  range: $ => seq(optional($._constraint_math_expression), '..', optional($._constraint_math_expression)),

  enum: $ => seq($.enum_value, repeat(seq('|', $.enum_value))),

  enum_value: $ => choice($.string_literal, $._number),
}