module.exports = {
  _literal: $ => prec.right(
    1,
    choice(
      $._number,
      $.string_literal,
      $.array_literal,
      $.struct_literal
    )
  ),

  string_literal: $ => /"[^"]*"/,

  boolean_literal: $ => /true|false/,

  regex_literal: $ => /\/[^\/\\]*(?:\\.[^\/\\]*)*\//,

  generic_arguments: $ => seq(
    '<',
      $.type, repeat(seq(',', $.type)), optional(','),
    '>'
  ),
}