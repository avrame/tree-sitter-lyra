module.exports = {
  array_type: $ => seq('Array<', $.type, optional(seq(',', $.array_capacity)), '>'),
  array_capacity: $ => /[0-9]+/,
}