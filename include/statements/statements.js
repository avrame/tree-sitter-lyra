module.exports = {
    _statement: $ => choice($.declaration, $.var_reassignment, $.return_statement),
    
    declaration: $ => seq(choice('let', 'var'), $.identifier, optional($.type_notation), '=', $.expression),

    var_reassignment: $ => seq($.identifier, '=', $.expression),

    identifier: $ => /[a-z][a-z0-9_]*/,

    return_statement: $ => seq('return', $.expression),
}