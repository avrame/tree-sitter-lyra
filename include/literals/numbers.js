module.exports = {
  _number_literal: $ => choice($.integer, $.float),

  integer: $ => choice($.octal_int, $.hexadecimal_int, $.binary_int, $._digit_sequence),
  
  _digit_sequence: $ => /[0-9_]+/,
  
  octal_int: $ => seq('0o', token.immediate(/[0-7_]+/)),
  hexadecimal_int: $ => seq('0x', token.immediate(/[0-9a-fA-F_]+/)),
  binary_int: $ => seq('0b', token.immediate(/[01_]+/)),

  float: $ => seq($._digit_sequence, '.', $._digit_sequence),
}