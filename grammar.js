/**
 * @file A tree-sitter parser for the Jewel Programming Language
 * @author Avram Eisner <avrame@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "jewel_parser",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
