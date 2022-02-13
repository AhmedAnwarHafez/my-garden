exports.up = function (knex) {
  return knex.schema.createTable('plants_images', table => {
    table.increments('id')
    table.string('image_name')
    table.string('plant_id')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('plants_images')
}
