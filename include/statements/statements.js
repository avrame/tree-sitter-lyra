module.exports = {
    _statement: $ => choice($.declaration, $.const_declaration, $.var_reassignment, $.return_statement),
    
    declaration: $ => seq(choice('let', 'var'), $.identifier, optional($.type_notation), '=', $.expression),
    const_declaration: $ => seq('const', $.const_identifier, optional($.type_notation), '=', $.expression),

    var_reassignment: $ => seq($.identifier, '=', $.expression),

    identifier: $ => /[a-z][a-z0-9_]*/,

    const_identifier: $ => /[A-Z][A-Z0-9_]*/,

    return_statement: $ => seq('return', $.expression),
}