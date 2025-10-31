module.exports = {
  map_literal: $ => prec.left(1, seq(
    'Map',
    '<', field('key_type', alias($.type, $.key_type)), ',', field('value_type', alias($.type, $.value_type)), '>',
    optional(
      seq(
        '{',
        $.map_entry,
        repeat(seq($._comma, $.map_entry)),
        optional($._comma),
        '}'
      )
    )
  )),

  map_entry: $ => seq(
    field('key', $.expression),
    '=>',
    field('value', $.expression),
  ),
}