const control_flow = require('./control-flow/');
const boolean = require('./boolean');
const math = require('./math');
const range = require('./range');

module.exports = {
  expression: $ => choice(
    $.postfix_expression,
    $._math_expr,
    $.boolean_expr,
    $.range_expr,
    $.if_then_expr,
    $.if_block_expr,
    $.match_expr,
    $.for_loop,
    $.for_in_loop,
    $._literal,
    $.spread_expr,
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
    $.nil_expr,
  ),

  _postfix_op: $ => choice(
    // function call
    field('call', alias($.argument_list, $.function_call)),
    // .prop / .Prop
    seq('.', field('property', choice($.identifier, $.const_identifier))),
    // [index]
    seq('[', field('index', $.expression), ']'),
  ),
  
  postfix_expression: $ => prec.right(300, choice(
    seq(
      choice($.identifier, $.const_identifier),
      repeat1($._postfix_op)
    ),
    seq(
      $.postfix_expression,
      $._postfix_op
    )
  )),

  spread_expr: $ => prec.right(20, seq('...', $.identifier)),
  nil_expr: $ => 'nil',

  ...control_flow,
  ...boolean,
  ...math,
  ...range,
}