module.exports = {
    _literal: $ => prec.right(1, choice($._number, $.string, $.array_literal, $.struct_literal)),

    string: $ => /"[^"]*"/,

    array_literal: $ => seq(
        '[',
            $.expression, repeat(seq(',', $.expression)), optional(','),
        ']'
    ),
}