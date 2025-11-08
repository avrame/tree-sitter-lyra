/**
 * @file A tree-sitter parser for the Lyra Programming Language
 * @author Avram Eisner <avrame@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const literals = require('./include/literals/');
const numbers = require('./include/literals/numbers');
const expressions = require('./include/expressions/');
const types = require('./include/types/');
const statements = require('./include/statements');
const functions = require('./include/functions/');
const comments = require('./include/comments');
const destructuring = require('./include/destructuring/destructuring');
const patterns = require('./include/patterns');

module.exports = grammar({
  name: "lyra",

  supertypes: $ => [$.expression, $.statement, $.pattern, $.type],

  extras: $ => [/\s/, $.comment],

  inline: $ => [$._comma],

  conflicts: $ => [
    [$.struct_literal, $._tuple_name],
  ],

  reserved: {
    identifier: () => ['for', 'if', 'else', 'match', 'let', 'var', 'const', 'def', 'nil', 'true', 'false', 'where'],
  },

  rules: {
    program: $ => repeat(choice($.statement, $.type_declaration)),

    _comma: $ => prec.left(10, ','),

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
