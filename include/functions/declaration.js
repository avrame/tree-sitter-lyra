module.exports = {
  function_declaration: $ => seq(
    'fn',
    field('name', $.identifier),
    optional(field('generic_parameters', $.generic_parameters)),
    field('parameters', $.parameter_list),
    optional(field('return_type', $.return_type_notation)),
    field('body', $.block)
  ),

  parameter_list: $ => seq(
    '(',
    optional(
      seq(
        $.parameter,
        repeat(seq($._comma, $.parameter)),
        optional($._comma),
      )
    ),
    ')'
  ),

  _comma: $ => prec.left(10, ','),

  parameter: $ => seq(
    field('name', $.identifier),
    optional(field('type', $.type_notation)),
    optional(field('default', $.default_value))
  ),

  default_value: $ => seq('=', $.expression),
}