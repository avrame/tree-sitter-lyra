module.exports = {
  tuple_type: $ => seq(
    $.tuple_type_name,
    optional($.generic_parameters),
    $.tuple_type_body
  ),

  tuple_type_name: $ => /[A-Z][a-zA-Z0-9]*/,

  tuple_type_body: $ => seq(
    '(',
      $.type,
      repeat(seq(',', $.type)),
      optional(','),
    ')'
  ),
}