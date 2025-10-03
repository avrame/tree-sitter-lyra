module.exports = {
    _statement: $ => choice($._assignment, $.return_statement),
    
    _assignment: $ => seq('let', $.identifier, optional($.type_notation), $.assignment_operator, $.expression),

    assignment_operator: $ => '=',

    identifier: $ => /[a-zA-Z_][a-zA-Z0-9_]*/,

    return_statement: $ => seq('return', $.expression),
}