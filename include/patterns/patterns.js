const { identifier } = require("../statements/statements");

module.exports = {
  // Core pattern types
  pattern: $ => prec.left(choice(
    $.identifier,                    // simple binding: x
    $.literal_pattern,              // literal matching: 42, "hello"
    $.array_pattern,                // array destructuring: [a, b, ...rest]
    $.struct_pattern,               // struct destructuring: {name, age}
    $.tuple_pattern,                // tuple destructuring: (x, y, z)
    $.wildcard_pattern              // wildcard: _
  )),

  // Array patterns (shared between destructuring and pattern matching)
  array_pattern: $ => seq(
    '[',
    $._pattern_element,
    repeat(seq(',', $._pattern_element)),
    optional(','),
    ']'
  ),

  // Struct patterns (shared)
  struct_pattern: $ => seq(
    '{',
    $._pattern_field,
    repeat(seq(',', $._pattern_field)),
    optional(','),
    '}'
  ),

  // Tuple patterns (shared)
  tuple_pattern: $ => seq(
    optional(field('tuple_name', alias($.identifier, $.tuple_name))),
    optional(field('generic_arguments', $.generic_parameters)),
    '(',
    $._pattern_element,
    repeat(seq(',', $._pattern_element)),
    optional(','),
    ')'
  ),

  // Pattern elements (shared)
  _pattern_element: $ => prec(1, choice(
    $.pattern,                      // nested patterns
    $.rest_pattern,                 // ...rest
    $.wildcard_pattern              // _
  )),

  // Pattern fields (shared)
  _pattern_field: $ => prec(1, choice(
    $.identifier,                   // { name }
    seq(
      $.identifier,
      ':',
      alias($.identifier, $.new_name)
    ), // { oldName: newName }
    $.pattern,                      // nested patterns
    $.rest_pattern,                 // ...rest
    $.wildcard_pattern              // _
  )),

  // Literal patterns (for pattern matching)
  literal_pattern: $ => choice(
    $._number,
    $.string_literal,
    $.boolean_literal
  ),

  // Wildcard pattern
  wildcard_pattern: $ => '_',

  // Rest pattern
  rest_pattern: $ => seq('...', $.identifier),
}