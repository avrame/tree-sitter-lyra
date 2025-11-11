module.exports = {
  string_literal: $ => seq(
    '"',
    repeat(choice(
      $.string_content,
      $.string_interpolation
    )),
    '"'
  ),
  
  string_content: $ => token.immediate(/[^"\\#]+|\\./),
  
  string_interpolation: $ => seq('#{', $.expression, '}')
}