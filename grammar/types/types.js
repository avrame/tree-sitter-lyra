module.exports = {
    type_notation: $ => seq(':', $.type),

    type_declaration: $ => choice($.struct_type, $.data_type),
    
    type: $ => choice($._primitive_type, $.user_defined_type, $.array_type),
    
    user_defined_type: $ => /[A-Z][a-zA-Z0-9]*/,

    _primitive_type: $ => choice($.integer_type, $.float_type, $.string_type, $.boolean_type),

    integer_type: $ => choice('Int', 'Int32', 'Int64'),

    float_type: $ => choice('Float', 'Float32', 'Float64'),

    string_type: $ => 'String',

    boolean_type: $ => 'Bool',

    array_type: $ => seq('[]', $.type),

    data_type: $ => seq('data', alias($.user_defined_type, $.data_type_name), '=', alias($.type, $.data_type_type)),

}
