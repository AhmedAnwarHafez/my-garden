exports.up = function (knex) {
  return knex.schema.createTable('plants', table => {
    table.increments('id')
    table.string('name')
    table.string('type')
    table.date('created_at')
    table.float('cost')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('plants')
}
