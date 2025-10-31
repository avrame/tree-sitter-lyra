module.exports = {
  function_definition: $ => seq(
    $.function_signature,
    'where',
    choice($.function_pattern, $.function_pattern_list),
  ),

  function_signature: $ => seq(
    'def',
    field('name', $.identifier),
    optional(field('generic_parameters', $.generic_parameters)),
    optional(seq(':', field('function_type', $.function_type))),
  ),

  parameter_type_list: $ => seq(
    '(',
    optional(
      seq(
        $.type,
        repeat(seq($._comma, $.type)),
        optional($._comma),
      )
    ),
    ')'
  ),

  function_pattern: $ => seq(
    field('parameters', $.parameter_list),
    '=>',
    field('body', choice(
      $.expression,
      $.block,
    )),
  ),

  function_pattern_list: $ => seq(
    '{',
    $.pattern_matching_function_pattern,
    repeat1(seq($._comma, $.pattern_matching_function_pattern)),
    optional($._comma),
    '}',
  ),

  pattern_matching_function_pattern: $ => seq(
    field('pattern', $.pattern),
    '=>',
    field('body', choice(
      $.expression,
      $.block,
    )),
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

  parameter: $ => seq(
    choice(field('name', $.identifier), field('pattern', $.pattern)),
    optional(field('default', $.default_value)),
  ),

  default_value: $ => seq('=', $.expression),
}