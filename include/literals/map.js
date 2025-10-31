module.exports = {
  map_literal: $ => prec.left(1, seq(
    '{',
    optional(seq(
      $.map_entry,
      repeat(seq($._comma, $.map_entry)),
      optional($._comma)
    )),
    '}'
  )),

  map_entry: $ => seq(
    field('key', $.expression),
    '=>',
    field('value', $.expression),
  ),
}