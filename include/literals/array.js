module.exports = {
  array_literal: $ => seq(
    '[',
    optional(
      seq(
        $.expression,
        repeat(seq(',', $.expression)),
        optional(',')
      )
    ),
    ']'
  ),
}