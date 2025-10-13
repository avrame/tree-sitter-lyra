/**
 * @file A tree-sitter parser for the Jewel Programming Language
 * @author Avram Eisner <avrame@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const literals = require('./include/literals/');
const numbers = require('./include/literals/numbers');
const expressions = require('./include/expressions/');
const types = require('./include/types/types');
const statements = require('./include/statements');
const functions = require('./include/functions/');
const comments = require('./include/comments');
const destructuring = require('./include/destructuring/destructuring');
const patterns = require('./include/patterns');

module.exports = grammar({
  name: "jewel",

  supertypes: $ => [$.expression, $.statement, $.pattern, $.type],

  extras: $ => [/\s/, $.comment],

  inline: $ => [$._comma],

  rules: {
    program: $ => repeat(choice($.statement, $.type_declaration)),

    ...literals,
    ...numbers,
    ...expressions,
    ...types,
    ...statements,
    ...functions,
    ...comments,
    ...destructuring,
    ...patterns,
  }
});
