
exports.up = function(knex) {
  return knex.schema.createTable('passwordToken', table => {
      table.increments('id').notNullable().primary()
      table.string('token').notNullable()
      table.int('user_id').notNullable()
      table.int('used').notNullable().defaultTo(0)

      table.foreign('user_id').references('user').inTable('user')
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('passwordToken')
  
};
