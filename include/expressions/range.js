module.exports = {
  range_expression: $ => prec.right(
    20,
    seq(
      alias($.expression, $.range_start),
      '..',
      $.range_end_operator,
      alias($.expression, $.range_end),
      optional(seq(',', alias($.expression, $.range_step)))
    )
  ),

  range_end_operator: $ => choice('<', '='),
}