exports.seed = function (knex) {
  return knex('plants_images').del()
    .then(function () {
      return knex('plants_images').insert([
        {
          id: 1,
          image_name: 'watermelon.jpg',
          plant_id: '1'
        }
      ])
    })
}
