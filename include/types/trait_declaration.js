module.exports = {
  trait_declaration: $ => seq(
    'trait',
    field('name', $.trait_name),
    '{',
    repeat(field('method', $.trait_method)),
    '}'
  ),

  trait_name: $ => /[A-Z][a-zA-Z0-9]*/,
  
  trait_method: $ => seq(
    alias(choice($.identifier, $.binary_operator), $.method_name),
    ':',
    field('function_type', $.function_type)
  ),

  binary_operator: $ => seq(
    '(',
    choice(
      token('=='),
      token('!='),
      token('>'),
      token('<'),
      token('>='),
      token('<='),
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
  ),
}