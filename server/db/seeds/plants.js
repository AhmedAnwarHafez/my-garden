exports.seed = function (knex) {
  return knex('plants').del()
    .then(function () {
      return knex('plants').insert([
        {
          id: 1,
          name: 'watermelon',
          type: 'succulent',
          created_at: '19 October 2021',
          cost: '18.85'
        }
      ])
    })
}
