module.exports = {
  anonymous_function: $ => seq(
    choice($.parameter, $.parameter_list),
    '=>',
    field('body', choice(
      $.expression,
      $.block,
    )),
  ),

  parameter_list: $ => seq(
    '(',
    $.parameter,
    repeat(seq($._comma, $.parameter)),
    optional($._comma),
    ')',
  ),

  parameter: $ => seq(
    choice(field('name', $.identifier), field('pattern', $.pattern)),
    optional(field('type', $.type_notation)),
    optional(field('default', $.default_value)),
  ),

  default_value: $ => seq('=', $.expression),
}