/**
 * @file A tree-sitter parser for the Jewel Programming Language
 * @author Avram Eisner <avrame@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const literals = require('./grammar/literals/literals');
const struct_literals = require('./grammar/literals/structs');
const numbers = require('./grammar/literals/numbers');
const expressions = require('./grammar/expressions/expressions');
const math_expressions = require('./grammar/expressions/math_expressions');
const types = require('./grammar/types/types');
const struct_types = require('./grammar/types/structs');
const statements = require('./grammar/statements/statements');


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
    ...struct_types,
    ...statements,
  }
});
