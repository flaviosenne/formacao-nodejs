
exports.up = function(knex) {
    return knex.schema.createTable('user', table => {
        table.increments('id').primary()
        table.string('name')
        table.string('email').notNullable().unique()
        table.string('password')
        table.integer('role')
    })
  
};

exports.down = function(knex) {
  return knex.schema.dropTable('user')
};
