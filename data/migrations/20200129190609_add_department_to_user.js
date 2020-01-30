
exports.up = function(knex) {
  return knex.schema.table('user', tbl => {
      tbl.string('department')
  })
};

exports.down = function(knex) {
  return knex.schema.dropColumn('department')
};
