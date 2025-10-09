module.exports = {
  // Destructuring-specific rules that extend patterns
  destructuring_pattern: $ => prec.right(choice(
    $.array_pattern,
    $.struct_pattern, 
    $.tuple_pattern,
    $.identifier  // simple destructuring: let x = value
  )),

  // Destructuring declarations
  destructuring_declaration: $ => seq(
    field('keyword', choice('let', 'var')),
    field('pattern', $.destructuring_pattern),
    optional(field('type', $.type_notation)),
    '=',
    field('value', $.expression)
  ),
}