module.exports = {
    _operator: $ => choice($._binary_operator, $.negation),

    _math_expression: $ => choice($._number, $._binary_operator, $.negation),

    _binary_operator: $ => choice($.addition, $.subtraction, $.multiplication, $.division),

    addition: $ => prec.left(1, seq($._math_expression, $.addition_operator, $._math_expression)),
    subtraction: $ => prec.left(1, seq($._math_expression, $.subtraction_operator, $._math_expression)),
    multiplication: $ => prec.left(2, seq($._math_expression, $.multiplication_operator, $._math_expression)),
    division: $ => prec.left(2, seq($._math_expression, $.division_operator, $._math_expression)),

    addition_operator: $ => '+',
    subtraction_operator: $ => '-',
    multiplication_operator: $ => '*',
    division_operator: $ => '/',

    negation: $ => prec.right(3, seq($.negation_operator, $._math_expression)),

    negation_operator: $ => '-',
}

