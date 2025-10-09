module.exports = {
    _math_expression: $ => choice($._number, $._arithmetic_operator, $.negation, $.identifier),

    // Math expression for constraints that can include const_identifier without circular dependency
    _constraint_math_expression: $ => choice($._number, $._constraint_arithmetic_operator, $.constraint_negation, $.identifier, $.const_identifier),

    _arithmetic_operator: $ => choice($.addition, $.subtraction, $.multiplication, $.division),
    _constraint_arithmetic_operator: $ => choice($.constraint_addition, $.constraint_subtraction, $.constraint_multiplication, $.constraint_division),

    addition: $ => prec.left(1, seq($._math_expression, '+', $._math_expression)),
    subtraction: $ => prec.left(1, seq($._math_expression, '-', $._math_expression)),
    multiplication: $ => prec.left(2, seq($._math_expression, '*', $._math_expression)),
    division: $ => prec.left(2, seq($._math_expression, '/', $._math_expression)),

    constraint_addition: $ => prec.left(1, seq($._constraint_math_expression, '+', $._constraint_math_expression)),
    constraint_subtraction: $ => prec.left(1, seq($._constraint_math_expression, '-', $._constraint_math_expression)),
    constraint_multiplication: $ => prec.left(2, seq($._constraint_math_expression, '*', $._constraint_math_expression)),
    constraint_division: $ => prec.left(2, seq($._constraint_math_expression, '/', $._constraint_math_expression)),

    negation: $ => prec.right(3, seq('-', $._math_expression)),
    constraint_negation: $ => prec.right(3, seq('-', $._constraint_math_expression)),
}

