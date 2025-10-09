module.exports = {
  tuple_literal: $ => seq(
    optional(field('tuple_name', alias($.identifier, $.tuple_name))),
    optional($.generic_arguments),
    '(',
      $.expression, repeat(seq(',', $.expression)), optional(','),
    ')'
  ),
}