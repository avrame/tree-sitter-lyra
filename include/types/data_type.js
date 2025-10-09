module.exports = {
  data_type: $ => seq(
    'data',
    alias($.user_defined_type_name, $.data_type_name),
    optional($.generic_parameters),
    '=',
    optional("|"), // Optional pipe for nice formatting (one constructor per line below data type name)
    $._data_type_constructor,
    repeat(seq('|', $._data_type_constructor))
  ),

  _data_type_constructor: $ => prec.right(seq(
    $.data_type_constructor_name,
    optional(
      choice(
        $.type,
        $.struct_type_body,
      )
    )
  )),

  data_type_constructor_name: $ => /[A-Z][a-zA-Z0-9]*/,
}