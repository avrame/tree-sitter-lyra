module.exports = {
    _math_expression: $ => choice($._number, $._arithmetic_operator, $.negation),

    _arithmetic_operator: $ => choice($.addition, $.subtraction, $.multiplication, $.division),

    addition: $ => prec.left(1, seq($._math_expression, '+', $._math_expression)),
    subtraction: $ => prec.left(1, seq($._math_expression, '-', $._math_expression)),
    multiplication: $ => prec.left(2, seq($._math_expression, '*', $._math_expression)),
    division: $ => prec.left(2, seq($._math_expression, '/', $._math_expression)),

    negation: $ => prec.right(3, seq('-', $._math_expression)),
}

