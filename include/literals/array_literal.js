module.exports = {
  array_literal: $ => seq(
      '[',
          $.expression, repeat(seq(',', $.expression)), optional(','),
      ']'
  ),
  array_spread: $ => seq('...', $.identifier),
}