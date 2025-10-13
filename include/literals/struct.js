module.exports = {
  struct_literal: $ => prec.left(1, seq(
    field('struct_name', alias($.user_defined_type_name, $.struct_name)),
    optional($.generic_arguments),
    '{', optional(seq($._struct_field, repeat(seq(',', $._struct_field)), optional(','))), '}'
  )),

  _struct_field: $ => seq(
    field('field_name', alias($.identifier, $.field_name)),
    ':',
    field('field_value', alias($.expression, $.field_value))
  ),
}