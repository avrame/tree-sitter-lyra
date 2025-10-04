/**
 * @file A tree-sitter parser for the Jewel Programming Language
 * @author Avram Eisner <avrame@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const literals = require('./grammer/literals/literals');
const struct_literals = require('./grammer/literals/structs');
const numbers = require('./grammer/literals/numbers');
const math_expressions = require('./grammer/expressions/math_expressions');
const types = require('./grammer/types/types');
const struct_types = require('./grammer/types/structs');
const statements = require('./grammer/statements/statements');


module.exports = grammar({
  name: "jewel_parser",

  supertypes: $ => [$.expression, $.type, $.type_declaration],

  rules: {
    source_file: $ => repeat(choice($.expression, $._statement, $.type_declaration)),

    expression: $ => choice($._math_expression, $._literal),

    ...literals,
    ...struct_literals,
    ...numbers,
    ...math_expressions,
    ...types,
    ...struct_types,
    ...statements,
  }
});
