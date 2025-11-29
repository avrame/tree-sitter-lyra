module.exports = {
  struct_literal: $ => prec.left(2, seq(
    optional(prec(4, field('struct_name', alias($.user_defined_type_name, $.struct_name)))),
    optional($.generic_arguments),
    '{',
      choice(
        $._struct_shorthand,
        seq($._struct_field, repeat(seq(',', $._struct_field)), optional(',')),
      ),
    '}'
  )),

  _struct_shorthand: $ => seq(
    $._field_value,
    repeat(seq(',', $._field_value)),
    optional(','),
  ),

  _struct_field: $ => seq(
    field('field_name', alias($.identifier, $.field_name)),
    ':',
    $._field_value,
  ),

  _field_value: $ => field('field_value', alias($.expression, $.field_value)),
}