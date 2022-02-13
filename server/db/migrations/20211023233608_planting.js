exports.up = function (knex) {
  return knex.schema.createTable('planting', table => {
    table.increments('id').primary()
    table.date('planting_date')
    table.date('reap_propagation_date')
    table.date('fertilization_date')
    table.date('pest_control_date')
    table.string('user_id').references('auth0_id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('planting')
}
