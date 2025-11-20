module.exports = {
  // A generic type is a lowercase letter optionally followed by any number of letters or numbers
  generic_type: $ => seq(
    /[a-z][a-z0-9]*/,
    optional(
      seq(
        '<',
        alias($.generic_type, $.generic_type_parameter),
        repeat(
          seq(
            ',',
            alias($.generic_type, $.generic_type_parameter)
          ),
        ),
        optional(','),
        '>'
      )
    )
  ),
  
  generic_parameters: $ => prec.left(15,
    seq(
      '<',
      $.generic_type,
      repeat(
        seq(
          ',',
          $.generic_type
        )
      ),
      optional(','),
      '>'
    )
  ),
}