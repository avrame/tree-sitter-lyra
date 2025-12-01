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
    $.if_block,
    optional(
      repeat(
      seq(
        $.else_if,
          $.if_condition,
          $.if_block,
        )
      )
    ),
    optional(
      seq(
        $.else,
        $.if_block,
      )
    )
  )),
  
  else_if: $ => 'else if',

  else: $ => 'else',

  if_condition: $ => choice(
    $.boolean_expr, 
    $._postfix_expression,
  ),
  
  if_block: $ => seq('{', repeat($.statement), '}'),
}