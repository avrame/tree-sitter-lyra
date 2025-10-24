module.exports = {
  // for item, idx in 0..10 { println("item: #{item}, idx: #{idx}") }
  // for item, idx in [1, 2, 3] { println("item: #{item}, idx: #{idx}") }
  // for key, value in {a: 1, b: 2} { println("key: #{key}, value: #{value}") }
  // for item in (1, 2, 3) { println("item: #{item}") }
  // for item in get_array() { println("item: #{item}") }
  // for key, value in some_struct { println("key: #{key}, value: #{value}") }
  for_in_loop: $ => seq(
    'for',
    $.for_in_condition,
    alias($.block, $.for_in_body)
  ),

  for_in_condition: $ => prec.left(1, seq(
    alias($.identifier, $.for_variable),
    optional(seq(',', alias($.identifier, $.for_index))),
    'in',
    choice(
      $.range_expr,
      $.array_literal,
      $.tuple_literal,
      $.struct_literal,
      $.identifier,
      $.postfix_expression,
    )
  )),
}