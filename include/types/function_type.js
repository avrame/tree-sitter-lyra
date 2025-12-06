module.exports = {
  function_type: $ => prec(3, seq(
    '(',
    optional($.function_type_parameter_list),
    ')',
    '->',
    $.type
  )),

  function_type_parameter_list: $ => seq(
    $.parameter_type,
    repeat(seq(',', $.parameter_type)),
    optional(',')
  ),

  parameter_type: $ => seq(
    optional(choice('ref', 'mut', 'own')),
    $.type,
  )
}