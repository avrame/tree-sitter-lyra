package tree_sitter_lyra_parser_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_lyra_parser "github.com/tree-sitter/tree-sitter-lyra_parser/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_lyra_parser.Language())
	if language == nil {
		t.Errorf("Error loading The Lyra Programming Language Parser grammar")
	}
}
