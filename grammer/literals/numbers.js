module.exports = {
  _number: $ => choice($.integer, $.float),

  _digits_and_underscore: $ => /[0-9_]+/,

  integer: $ => $._digits_and_underscore,

  float: $ => seq($._digits_and_underscore, '.', $._digits_and_underscore),
}