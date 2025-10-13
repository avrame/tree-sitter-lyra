import XCTest
import SwiftTreeSitter
import TreeSitterJewelParser

final class TreeSitterJewelParserTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_lyra_parser())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading The Jewel Programming Language Parser grammar")
    }
}
