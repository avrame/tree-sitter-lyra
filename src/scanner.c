#include "tree_sitter/parser.h"

enum TokenType {
  _BLOCK_COMMENT,
};

void *tree_sitter_lyra_external_scanner_create(void) {
  return NULL;
}

void tree_sitter_lyra_external_scanner_destroy(void *payload) {
  // No cleanup needed
}

unsigned tree_sitter_lyra_external_scanner_serialize(void *payload, char *buffer) {
  return 0;
}

void tree_sitter_lyra_external_scanner_deserialize(void *payload, const char *buffer, unsigned length) {
  // No state to deserialize
}

bool tree_sitter_lyra_external_scanner_scan(void *payload, TSLexer *lexer, const bool *valid_symbols) {
  // Only scan if _BLOCK_COMMENT is expected
  if (!valid_symbols[_BLOCK_COMMENT]) {
    return false;
  }

  // Skip whitespace
  while (lexer->lookahead == ' ' || lexer->lookahead == '\t' || 
         lexer->lookahead == '\n' || lexer->lookahead == '\r') {
    lexer->advance(lexer, true);
  }

  // Check if we're at the start of a block comment
  if (lexer->lookahead != '/') {
    return false;
  }
  lexer->advance(lexer, false);
  
  if (lexer->lookahead != '*') {
    return false;
  }
  lexer->advance(lexer, false);

  // Track nesting depth
  unsigned depth = 1;

  // Scan until we find the matching closing comment
  while (depth > 0) {
    if (lexer->eof(lexer)) {
      return false; // Unclosed comment
    }

    if (lexer->lookahead == '*') {
      lexer->advance(lexer, false);
      if (lexer->lookahead == '/') {
        lexer->advance(lexer, false);
        depth--;
      }
    } else if (lexer->lookahead == '/') {
      lexer->advance(lexer, false);
      if (lexer->lookahead == '*') {
        lexer->advance(lexer, false);
        depth++;
      }
    } else {
      lexer->advance(lexer, false);
    }
  }

  lexer->result_symbol = _BLOCK_COMMENT;
  lexer->mark_end(lexer);
  return true;
}

