module.exports = {
  function_declaration: $ => seq(
    'fn',
    field('name', $.identifier),
    field('parameters', $.parameter_list),
    optional(field('return_type', $.type_notation)),
    field('body', $.block)
  ),

  parameter_list: $ => seq(
    '(',
    $.parameter,
    repeat(seq(',', $.parameter)),
    optional(','),
    ')'
  ),

  parameter: $ => seq(
    field('name', $.identifier),
    optional(field('type', $.type_notation)),
    optional(field('default', $.default_value))
  ),

  default_value: $ => seq('=', $.expression),
}