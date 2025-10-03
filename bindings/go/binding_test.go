package tree_sitter_jewel_parser_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_jewel_parser "github.com/tree-sitter/tree-sitter-jewel_parser/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_jewel_parser.Language())
	if language == nil {
		t.Errorf("Error loading The Jewel Programming Language Parser grammar")
	}
}
