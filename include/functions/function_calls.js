module.exports = {
  function_call: $ => prec(100, seq(
    field('name', alias($.identifier, $.function_name)),
    field('arguments', $.argument_list)
  )),

  argument_list: $ => seq(
    '(',
    field('argument', $.argument),
    repeat(seq(',', $.argument)),
    optional(','),
    ')'
  ),

  argument: $ => seq(
    field('name', alias($.identifier, $.argument_name)), // for named arguments
    '=',
    choice(
      field('value', alias($.expression, $.argument_value)),
      field('wildcard', alias('_' , $.wildcard)) // for partial application
    )
  ),
}