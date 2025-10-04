module.exports = {
    _statement: $ => choice($.let_assignment, $.return_statement),
    
    let_assignment: $ => seq('let', alias($.identifier, $.let_identifier), optional($.type_notation), '=', $.expression),

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    return_statement: $ => seq('return', $.expression),
}