module.exports = {
  trait_implementation: $ => prec.right(100, seq(
    'impl',
    $.trait_name,
    'for',
    $.user_defined_type_name,
    '{',
    field('method', $.trait_method_implementation),
    repeat(seq(',', field('method', $.trait_method_implementation))),
    optional(','),
    '}',
  )),
  
  trait_method_implementation: $ => seq(
    alias(choice($.identifier, $.binary_operator), $.method_name),
    '=',
    field('function_pattern', $.function_pattern)
  ),
}