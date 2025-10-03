module.exports = {
    type_notation: $ => seq($.type_operator, $.type),

    type_declaration: $ => choice($.struct_type, $.data_type),

    type_operator: $ => ':',
    
    type: $ => choice($._primitive_type, $.user_defined_type, $.array_type),
    
    user_defined_type: $ => /[A-Z][a-zA-Z0-9]*/,

    _primitive_type: $ => choice($.integer_type, $.float_type, $.string_type, $.boolean_type),

    integer_type: $ => choice('Int', 'Int32', 'Int64'),

    float_type: $ => choice('Float', 'Float32', 'Float64'),

    string_type: $ => 'String',

    boolean_type: $ => 'Bool',

    array_type: $ => seq('[]', $.type),

    struct_type: $ => seq(
        'struct',
        field('struct_name', alias($.user_defined_type, $.struct_name)),
        '{',
            $._struct_member,
            repeat(seq(',', $._struct_member)),
            optional(','),
        '}'
    ),

    _struct_member: $ => seq(
        field('field_name', alias($.identifier, $.field_name)),
        ':',
        field('field_type', alias($.type, $.field_type))
    ),

    data_type: $ => seq('data', alias($.user_defined_type, $.data_type_name), '=', alias($.type, $.data_type_type)),

}
