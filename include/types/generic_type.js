module.exports = {
  // A generic type is a lowercase letter optionally followed by any number of letters or numbers
  generic_type: $ => /[a-z][a-z0-9]*/,

  generic_parameters: $ => prec.left(15, seq('<', $.generic_type, repeat(seq(',', $.generic_type)), optional(','), '>')),
}