module.exports = {
  data_type: $ => seq(
    'data',
    alias($.user_defined_type, $.data_type_name),
    '=',
    $.data_type_constructor,
    repeat(seq('|', $.data_type_constructor))
  ),

  data_type_constructor: $ => seq($.data_type_constructor_name,choice($.array_literal, $.struct_literal)),

  data_type_constructor_name: $ => /[A-Z][a-zA-Z0-9]*/,
}