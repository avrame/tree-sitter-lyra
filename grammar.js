/**
 * @file A tree-sitter parser for the Jewel Programming Language
 * @author Avram Eisner <avrame@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const literals = require('./include/literals/literals');
const struct_literals = require('./include/literals/struct_literal');
const tuple_literals = require('./include/literals/tuple_literal');
const array_literals = require('./include/literals/array_literal');
const numbers = require('./include/literals/number_literals');
const expressions = require('./include/expressions/expressions');
const math_expressions = require('./include/expressions/math_expressions');
const types = require('./include/types/types');
const alias_types = require('./include/types/alias_type');
const array_types = require('./include/types/array_type');
const number_types = require('./include/types/number_types');
const struct_types = require('./include/types/struct_type');
const tuple_types = require('./include/types/tuple_type');
const data_types = require('./include/types/data_type');
const statements = require('./include/statements/statements');


module.exports = grammar({
  name: "jewel_parser",

  supertypes: $ => [$.expression, $.type, $.type_declaration],

  rules: {
    source_file: $ => repeat(choice($.expression, $._statement, $.type_declaration)),

    ...literals,
    ...struct_literals,
    ...tuple_literals,
    ...array_literals,
    ...numbers,
    ...expressions,
    ...math_expressions,
    ...types,
    ...array_types,
    ...number_types,
    ...struct_types,
    ...tuple_types,
    ...data_types,
    ...statements,
    ...alias_types,
  }
});
