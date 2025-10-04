module.exports = {
  struct_literal: $ => seq(
    field('struct_name', alias($.identifier, $.struct_name)),
    '{',
        $._struct_field,
        repeat(seq(',', $._struct_field)),
        optional(','),
    '}'
  ),

  _struct_field: $ => seq(
    field('field_name', alias($.identifier, $.field_name)),
    ':',
    field('field_value', alias($.expression, $.field_value))
  ),
}