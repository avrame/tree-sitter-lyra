module.exports = {
    // Primary math expression - includes all math operations
    _math_expression: $ => choice($._primary_math_expression, $.addition, $.subtraction, $.multiplication, $.division),

    // Primary math expression - base elements without arithmetic operators or negation to avoid circular dependency
    _primary_math_expression: $ => choice($._number, $.identifier, $.group, $.negation),

    // Math expression for constraints that can include const_identifier without circular dependency
    _constraint_math_expression: $ => choice($._number, $._constraint_arithmetic_operator, $.constraint_negation, $.identifier, $.const_identifier),

    _arithmetic_operator: $ => choice($.addition, $.subtraction, $.multiplication, $.division),
    _constraint_arithmetic_operator: $ => choice($.constraint_addition, $.constraint_subtraction, $.constraint_multiplication, $.constraint_division),

    addition: $ => prec.left(10, seq($._primary_math_expression, '+', $._math_expression)),
    subtraction: $ => prec.left(10, seq($._primary_math_expression, '-', $._math_expression)),
    multiplication: $ => prec.left(20, seq($._primary_math_expression, '*', $._math_expression)),
    division: $ => prec.left(20, seq($._primary_math_expression, '/', $._math_expression)),
    negation: $ => prec.right(35, seq('-', $._primary_math_expression)),

    constraint_addition: $ => prec.left(10, seq($._constraint_math_expression, '+', $._constraint_math_expression)),
    constraint_subtraction: $ => prec.left(10, seq($._constraint_math_expression, '-', $._constraint_math_expression)),
    constraint_multiplication: $ => prec.left(20, seq($._constraint_math_expression, '*', $._constraint_math_expression)),
    constraint_division: $ => prec.left(20, seq($._constraint_math_expression, '/', $._constraint_math_expression)),
    constraint_negation: $ => prec.right(30, seq('-', $._constraint_math_expression)),

    group: $ => prec(100, seq('(', $._math_expression, ')')),
}

