module.exports = {
  function_type: $ => prec(3, seq(
    '(',
    optional($.function_type_parameter_list),
    ')',
    '->',
    $.type
  )),

  function_type_parameter_list: $ => seq(
    $.type,
    repeat(seq(',', $.type)),
    optional(',')
  ),
}