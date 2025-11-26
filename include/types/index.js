const alias_type = require('./alias_type');
const array_type = require('./array_type');
const data_type = require('./data_type');
const function_type = require('./function_type');
const generic_type = require('./generic_type');
const number_types = require('./number_types');
const struct_type = require('./struct_type');
const tuple_type = require('./tuple_type');
const map_type = require('./map_type');
const trait_declaration = require('./trait_declaration');
const trait_implementation = require('./trait_implementation');

module.exports = {
    type_notation: $ => seq(':', $.type),

    return_type_notation: $ => seq('->', $.type),

    type_declaration: $ => choice($.struct_type, $.data_type, $.alias_type, $.trait_declaration, $.trait_implementation),
    
    type: $ => prec(2, choice(
        $._primitive_type,
        $.self_type,
        $.user_defined_type_name,
        $.array_type,
        $.generic_type,
        $.function_type,
        $.map_type,
    )),
    
    user_defined_type_name: $ => /[A-Z][a-zA-Z0-9]*/,

    self_type: $ => 'Self',

    _primitive_type: $ => choice($._integer_type, $.float_type, $.string_type, $.boolean_type),

    string_type: $ => 'String',

    boolean_type: $ => 'Bool',

    ...alias_type,
    ...array_type,
    ...data_type,
    ...function_type,
    ...generic_type,
    ...number_types,
    ...struct_type,
    ...tuple_type,
    ...map_type,
    ...trait_declaration,
    ...trait_implementation,
}
