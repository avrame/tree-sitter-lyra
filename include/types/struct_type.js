module.exports = {
  struct_type: $ => seq(
    optional($.visibility),
    'struct',
    field('struct_name', alias($.user_defined_type_name, $.struct_name)),
    optional($.generic_parameters),
    $.struct_type_body
  ),

  struct_type_body: $ => seq(
    '{',
        $._struct_member,
        repeat(seq(',', $._struct_member)),
        optional(','),
    '}'
  ),

  _struct_member: $ => seq(
    field('field_name', alias($.identifier, $.field_name)),
    ':',
    field('field_type', alias($.type, $.field_type))
  ),
}