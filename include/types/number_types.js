module.exports = {
  _integer_type: $ => choice($.signed_integer_type, $.unsigned_integer_type),
  signed_integer_type: $ => choice('Int','Int8', 'Int16', 'Int32', 'Int64'),
  unsigned_integer_type: $ => choice('UInt', 'UInt8', 'UInt16', 'UInt32', 'UInt64'),
  float_type: $ => choice('Float16', 'Float32', 'Float64'),
}