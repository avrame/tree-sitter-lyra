/**
 * @file A tree-sitter parser for the Jewel Programming Language
 * @author Avram Eisner <avrame@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const math_expressions = require('./grammer/math_expressions');
const literals = require('./grammer/literals');
const types = require('./grammer/types');
const statements = require('./grammer/statements');

module.exports = grammar({
  name: "jewel_parser",

  supertypes: $ => [$.expression, $.type, $.type_declaration],

  rules: {
    source_file: $ => repeat(choice($.expression, $._statement, $.type_declaration)),

    expression: $ => choice($._math_expression, $._literal),

    ...literals,
    ...math_expressions,
    ...types,
    ...statements,
  }
});
