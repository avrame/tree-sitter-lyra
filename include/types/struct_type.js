module.exports = {
  struct_type: $ => seq(
    optional($.visibility),
    optional(field('allocation', $.allocation_modifier)),
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
    optional(alias('[mut]:', $.mut_keyword)), // all fields following this are mutable
    field('field_name', alias($.identifier, $.field_name)),
    ':',
    field('field_type', alias($.type, $.field_type)),
    optional($.default_field_value)
  ),

  default_field_value: $ => seq('=', $.expression)
}