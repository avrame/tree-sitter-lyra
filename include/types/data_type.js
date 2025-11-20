module.exports = {
  data_type: $ => seq(
    'data',
    alias($.user_defined_type_name, $.data_type_name),
    optional($.generic_parameters),
    '=',
    optional("|"), // Optional pipe for nice formatting (one constructor per line below data type name)
    $.data_type_constructor,
    repeat(seq('|', $.data_type_constructor))
  ),

  data_type_constructor: $ => choice(
    seq(
      field('name', $.data_type_constructor_name),
      '(',
      field('param', $.type),
      ')'
    ),
    seq(
      field('name', $.data_type_constructor_name),
      field('body', $.struct_type_body),
    ),
    field('name', $.data_type_constructor_name)
  ),
  data_type_constructor_name: $ => /[A-Z][a-zA-Z0-9]*/,
}