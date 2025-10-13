module.exports = {
  argument_list: $ => prec.left(1, seq(
    '(',
    optional(
      choice(
        // named arguments only
        seq(
          $.named_argument,
          repeat(seq($._comma, $.named_argument)),
        ),
        // positional arguments optionally followed by named arguments
        seq(
          $._argument_value,
          repeat(seq($._comma, $._argument_value)),
          optional(seq(
            repeat1(seq($._comma, $.named_argument)),
          )),
        ),
      )
    ),
    ')'
  )),

  named_argument: $ => seq(
    field('name', alias($.identifier, $.argument_name)),
    '=',
    $._argument_value
  ),

  _argument_value: $ => choice(
    field('value', alias($.expression, $.value)),
    field('wildcard', alias('_', $.wildcard)) // for partial application
  )
}

