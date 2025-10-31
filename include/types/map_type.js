module.exports = {
  map_type: $ => seq(
    'Map',
    '<',
    field('key_type', alias($.type, $.key_type)),
    ',',
    field('value_type', alias($.type, $.value_type)),
    '>',
  ),
}