module.exports = {
  comment: $ =>
    choice(
      token(seq("//", /.*/)),
      $._BLOCK_COMMENT,
    ),
}