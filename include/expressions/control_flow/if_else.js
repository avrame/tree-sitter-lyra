module.exports = {
  if_then_expr: $ => prec.right(20, seq(
    'if',
    $.if_condition,
    'then',
    $.expression,
    optional(
      seq(
        $.else_if,
        $.if_condition,
        'then',
        $.expression,
      )
    ),
    $.else,
    $.expression,
    optional('end'), // Only needed if on multiple lines
  )),

  if_block_expr: $ => prec.right(10, seq(
    'if',
    $.if_condition,
    $.block,
    optional(
      repeat(
        seq(
          $.else_if,
          $.if_condition,
          $.block,
        )
      )
    ),
    optional(
      seq(
        $.else,
        $.block,
      )
    )
  )),
  
  else_if: $ => 'else if',

  else: $ => 'else',

  if_condition: $ => choice(
    $.boolean_expr, 
    $._postfix_expression,
  ),
}