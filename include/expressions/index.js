const boolean = require('./boolean');
const math = require('./math');
const range = require('./range');

module.exports = {
  expression: $ => choice(
    $.function_call_expression,
    $.postfix_expression,
    $._math_expr,
    $.boolean_expr,
    $.range_expr,
    $.if_then_expr,
    $.if_block_expr,
    $.for_loop, // can return a value after a break statement
    $.for_in_loop, // can return a value after a break statement
    $._literal,
    $.spread_expr,
    $.match_expr,
  ),

  // Function call expression with higher precedence
  function_call_expression: $ => prec.left(201, seq(
    choice($.identifier, $.const_identifier, $.qualified_identifier),
    $.argument_list
  )),

  // Qualifiers like Foo.Bar.Baz or math.sin
  qualified_identifier: $ => prec.right(190, seq(
    choice($.identifier, $.const_identifier),
    repeat1(seq('.', choice($.identifier, $.const_identifier)))
  )),
  identifier: $ => /[a-z][a-z0-9_]*/,
  const_identifier: $ => /[A-Z][A-Z0-9_]*/,

  // Grouping
  parenthesized_expression: $ => prec.left(1, seq('(', $.expression, ')')),

  _primary_expression: $ => choice(
    $.qualified_identifier,
    $.identifier,
    $.const_identifier,
    // Only allow parenthesized_expression at statement start, not in postfix context
    prec.left(1, $.parenthesized_expression),
    // $.lambda_expression, // TODO: add lambda expression
    $.nil_expr,
  ),

  // Postfix chain: a.b(c)[d].e(...)
  // This makes member access / call / index all chainable and left-assoc.
  postfix_expression: $ => prec.left(200, seq(
    $._primary_expression,
    repeat(choice(
      // member access
      alias(seq('.', field('property', $.identifier)), $.member_access),
      // indexing
      alias(seq('[', field('index', $.expression), ']'), $.indexing),
      // function call (argument_list should allow 0..n args) - higher precedence
      prec.left(201, alias($.argument_list, $.function_call))
    ))
  )),

  spread_expr: $ => prec.right(20, seq('...', $.identifier)),
  nil_expr: $ => 'nil',
  ...boolean,
  ...math,
  ...range,
}