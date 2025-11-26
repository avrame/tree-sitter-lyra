module.exports = {
  trait_declaration: $ => seq(
    optional($.visibility),
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
    alias(
      choice($.identifier, $.unary_operator, $.binary_operator),
      $.method_name
    ),
    ':',
    field('function_type', $.function_type),
  ),

  unary_operator: $ => prec(1, seq(
    '(',
    choice($.prefix_operator, $.suffix_operator),
    ')',
  )),

  prefix_operator: $ => prec(1, seq(
    choice('-', '!', '~'),
    '_',
  )),

  suffix_operator: $ => prec(1, seq(
    '_',
    choice('++', '--', '!'),
  )),

  binary_operator: $ => prec(1, seq(
    '(',
    '_',
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
    '_',
    ')'
  )),
}