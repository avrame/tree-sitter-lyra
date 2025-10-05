module.exports = {
  _number: $ => choice($.integer, $.float),

  _digit_sequence: $ => /[0-9_]+/,

  integer: $ => $._digit_sequence,

  float: $ => seq($._digit_sequence, '.', $._digit_sequence),
}