module.exports = {
  tuple_literal: $ => prec.left(1,
    choice(
      seq('(',')'),
      seq(
        optional($._tuple_name),
        optional($.generic_arguments),
        '(',
          $._tuple_value,
          repeat(seq($._comma, $._tuple_value)),
          optional($._comma),
        ')'
      )
    )
  ),

  _tuple_value: $ => prec.right(1, alias($.expression, $.tuple_value)),

  _tuple_name: $ => prec(2, field('tuple_name', alias($.user_defined_type_name, $.tuple_name))),
}