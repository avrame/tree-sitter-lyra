const control_flow = require('./control_flow/');
const boolean = require('./boolean');
const array_comprehension = require('./array_comprehension');
const math = require('./math');
const range = require('./range');

module.exports = {
  expression: $ => choice(
    $.await_expression,
    $._postfix_expression,
    $._math_expr,
    $.boolean_expr,
    $.range_expression,
    $.if_then_expr,
    $.if_block_expr,
    $.match_expr,
    $._literal,
    $.spread_expr,
    $.lambda_expression,
    $.array_comprehension,
    $.null_coalescing_expression,
    // Note: user_defined_type_name is accessed via _postfix_expression -> _primary_expression
  ),

  // Await expression for async operations
  await_expression: $ => prec.right(250, seq(
    'await',
    field('operand', $.expression)
  )),

  identifier: $ => /[a-z][a-zA-Z0-9_]*/,
  const_identifier: $ => /[A-Z][A-Z0-9_]*/,

  // Grouping
  parenthesized_expression: $ => seq('(', $.expression, ')'),

  _primary_expression: $ => choice(
    $.identifier,
    $.const_identifier,
    $.user_defined_type_name,  // For static method calls like Arena.new()
    $.parenthesized_expression,
    // $.lambda_expression, // TODO: add lambda expression
  ),

  // Postfix expressions with binary nesting - each operation wraps the previous
  _postfix_expression: $ => choice(
    $.call_expression,
    $.member_expression,
    $.optional_member_expression,
    $.index_expression,
    $.optional_index_expression,
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

  // Optional member access - safe navigation for Maybe<T>
  // Returns Maybe<T> instead of T, doesn't change control flow
  optional_member_expression: $ => prec.left(300, seq(
    field('object', $._postfix_expression),
    '?.',
    field('property', choice($.identifier, $.const_identifier))
  )),

  index_expression: $ => prec.left(300, seq(
    field('object', $._postfix_expression),
    '[',
    field('index', $.expression),
    ']'
  )),

  // Optional index access - safe indexing for Maybe<T> or bounds checking
  // Returns Maybe<T> instead of T
  optional_index_expression: $ => prec.left(300, seq(
    field('object', $._postfix_expression),
    '?[',
    field('index', $.expression),
    ']'
  )),

  try_expression: $ => prec.left(300, seq(
    field('operand', $._postfix_expression),
    '?'
  )),

  // Null coalescing - provide default value for Maybe<T>
  null_coalescing_expression: $ => prec.right(25, seq(
    field('optional', $.expression),
    '??',
    field('default', $.expression)
  )),

  spread_expr: $ => prec.right(20, seq('...', $.identifier)),

  ...control_flow,
  ...boolean,
  ...math,
  ...range,
  ...array_comprehension,
}