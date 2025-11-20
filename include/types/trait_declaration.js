module.exports = {
  trait_declaration: $ => seq(
    'trait',
    field('name', $.trait_name),
    optional(field('generic_parameters', $.generic_parameters)),
    optional(seq(':', field('trait_bounds', $.trait_bounds))),
    '{',
    field('method', $.trait_method),
    repeat(seq(',', field('method', $.trait_method))),
    optional(','),
    '}'
  ),

  trait_name: $ => /[A-Z][a-zA-Z0-9]*/,

  trait_bounds: $ => seq(
    $.trait_name,
    repeat(seq('+', $.trait_name)),
  ),
  
  trait_method: $ => seq(
    alias(choice($.identifier, $.binary_operator), $.method_name),
    ':',
    field('function_type', $.function_type),
  ),

  binary_operator: $ => prec(1, seq(
    '(',
    choice(
      token('=='),
      token('!='),
      token('>'),
      token('<'),
      token('>='),
      token('<='),
      token('<=>'),
      token('&&'),
      token('||'),
      token('+'),
      token('-'),
      token('*'),
      token('/'),
      token('%'),
      token('**'),
      token('<<'),
      token('>>'),
      token('&'),
      token('|'),
      token('^'),
      token('~'),
    ),
    ')'
  )),
}