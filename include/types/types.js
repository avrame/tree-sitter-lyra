module.exports = {
    type_notation: $ => seq(':', $.type),

    type_declaration: $ => choice($.struct_type, $.data_type, $.alias_type),
    
    type: $ => choice($._primitive_type, $.user_defined_type_name, $.array_type, $.generic_type),
    
    user_defined_type_name: $ => /[A-Z][a-zA-Z0-9]*/,

    _primitive_type: $ => choice($._integer_type, $.float_type, $.string_type, $.boolean_type),

    string_type: $ => 'String',

    boolean_type: $ => 'Bool',

    generic_parameters: $ => seq('<', $.generic_type, repeat(seq(',', $.generic_type)), optional(','), '>'),

    // A generic type is a lowercase letter optionally followed by any number of letters or numbers
    generic_type: $ => /[a-z][a-z0-9]*/
}
