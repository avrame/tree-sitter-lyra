const control_flow = require('./control-flow/');
const boolean = require('./boolean');
const math = require('./math');
const range = require('./range');

module.exports = {
  expression: $ => choice(
    $._postfix_expression,
    $._math_expr,
    $.boolean_expr,
    $.range_expr,
    $.if_then_expr,
    $.if_block_expr,
    // $.if_let_expr,
    $.match_expr,
    $._literal,
    $.spread_expr,
    $.lambda_expression,
    $.user_defined_type_name,
  ),

  identifier: $ => /[a-z][a-z0-9_]*/,
  const_identifier: $ => /[A-Z][A-Z0-9_]*/,

  // Grouping
  parenthesized_expression: $ => seq('(', $.expression, ')'),

  _primary_expression: $ => choice(
    $.identifier,
    $.const_identifier,
    $.parenthesized_expression,
    // $.lambda_expression, // TODO: add lambda expression
  ),

  // Postfix expressions with binary nesting - each operation wraps the previous
  _postfix_expression: $ => choice(
    $.call_expression,
    $.member_expression,
    $.index_expression,
    $.try_expression,
    $._primary_expression,
  ),

  call_expression: $ => prec.left(300, seq(
    field('function', $._postfix_expression),
    optional($.generic_arguments),
    field('arguments', $.argument_list)
  )),

  member_expression: $ => prec.left(300, seq(
    field('object', $._postfix_expression),
    '.',
    field('property', choice($.identifier, $.const_identifier))
  )),

  index_expression: $ => prec.left(300, seq(
    field('object', $._postfix_expression),
    '[',
    field('index', $.expression),
    ']'
  )),

  try_expression: $ => prec.left(300, seq(
    field('operand', $._postfix_expression),
    '?'
  )),

  spread_expr: $ => prec.right(20, seq('...', $.identifier)),

  ...control_flow,
  ...boolean,
  ...math,
  ...range,
}