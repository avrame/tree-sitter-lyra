module.exports = {
  range_expr: $ => prec.right(
    20,
    seq(
      alias($.expression, $.range_start),
      '..',
      alias($.expression, $.range_end),
      optional(seq(',', alias($.expression, $.range_step)))
    )
  ),
}