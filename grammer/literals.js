module.exports = {
    _literal: $ => prec.right(1, choice($._number, $.string, $.array_literal, $.struct_literal)),

    _number: $ => choice($.integer, $.float),

    integer: $ => /[0-9]+/,

    float: $ => seq($.integer, $.dot, $.integer),

    dot: $ => /\./,

    string: $ => /"[^"]*"/,

    array_literal: $ => seq(
        '[',
            $.expression, repeat(seq(',', $.expression)), optional(','),
        ']'
    ),

    struct_literal: $ => seq(
        '{',
            $._struct_member,
            repeat(seq(',', $._struct_member)),
            optional(','),
        '}'
    ),

    _struct_member: $ => seq(
        field('field_name', alias($.identifier, $.field_name)),
        ':',
        field('field_type', alias($.expression, $.field_type))
    ),
}