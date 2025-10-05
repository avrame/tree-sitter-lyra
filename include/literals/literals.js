module.exports = {
    _literal: $ => prec.right(1, choice($._number, $.string, $.array_literal, $.struct_literal)),

    string: $ => /"[^"]*"/,

    generic_arguments: $ => seq(
        '<',
            $.type, repeat(seq(',', $.type)), optional(','),
        '>'
    ),
}