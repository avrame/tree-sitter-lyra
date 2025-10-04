/**
 * @file A tree-sitter parser for the Jewel Programming Language
 * @author Avram Eisner <avrame@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const literals = require('./include/literals/literals');
const struct_literals = require('./include/literals/structs');
const numbers = require('./include/literals/numbers');
const expressions = require('./include/expressions/expressions');
const math_expressions = require('./include/expressions/math_expressions');
const types = require('./include/types/types');
const number_types = require('./include/types/numbers');
const data_types = require('./include/types/data_types');
const struct_types = require('./include/types/structs');
const statements = require('./include/statements/statements');


module.exports = grammar({
  name: "jewel_parser",

  supertypes: $ => [$.expression, $.type, $.type_declaration],

  rules: {
    source_file: $ => repeat(choice($.expression, $._statement, $.type_declaration)),

    ...literals,
    ...struct_literals,
    ...numbers,
    ...expressions,
    ...math_expressions,
    ...types,
    ...number_types,
    ...data_types,
    ...struct_types,
    ...statements,
  }
});
