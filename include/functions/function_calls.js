module.exports = {
  function_call: $ => seq(
    field('name', $.identifier),
    field('arguments', $.argument_list)
  ),

  argument_list: $ => seq(
    '(',
    $.argument,
    repeat(seq(',', $.argument)),
    optional(','),
    ')'
  ),

  argument: $ => seq(
    field('name', $.identifier), // for named arguments
    '=',
    choice(
      field('value', $.expression),
      field('wildcard', '_') // for partial application
    )
  ),
}