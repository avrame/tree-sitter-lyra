module.exports = {
  // Pattern matching expressions
  match_expr: $ => seq(
    'match',
    field('value', $.expression),
    '{',
    repeat($.match_arm),
    '}'
  ),

  match_arm: $ => seq(
    field('pattern', $.pattern),
    optional($.guard),
    '=>',
    field('body', $.expression)
  ),

  guard: $ => seq('if', $.expression),

  // Pattern matching in function parameters
  function_pattern: $ => $.pattern,
}