exports.seed = function (knex) {
  return knex('planting').del()
    .then(function () {
      return knex('planting').insert([
        {
          id: 1,
          planting_date: '5 February 2020',
          reap_propagation_date: '8 February 2021',
          fertilization_date: '5 May 2020',
          pest_control_date: '5 July 2020',
          user_id: '123'
        }
      ])
    })
}
