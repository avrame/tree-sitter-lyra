module.exports = {
  array_literal: $ => seq(
    '[',
    optional(choice(
      // Repeat initialization: [value; count]
      $.array_repeat,
      // Regular array elements: [a, b, c]
      seq(
        $.expression,
        repeat(seq(',', $.expression)),
        optional(',')
      )
    )),
    ']'
  ),

  // Array repeat initialization: [value; count]
  // Creates an array with `count` copies of `value`
  array_repeat: $ => seq(
    field('value', $.expression),
    ';',
    field('count', $.array_repeat_count)
  ),

  // Count must be a compile-time constant
  array_repeat_count: $ => choice($._number_literal, $.const_identifier),
}