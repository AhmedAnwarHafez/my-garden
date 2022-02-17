const connection = require('./connection')

module.exports = {
  getPlants,
  addPlant,
  updatePlant,
  delPlant
}

function getPlants (auth0Id, db = connection) {
  return db('plants')
    .join('planting', 'plants.id', 'planting.id')
    .where('planting.user_id', auth0Id)
    .select(
      'planting.planting_date as plantingDate',
      'planting.reap_propagation_date as reapOrPropagationDate',
      'planting.fertilization_date as fertilizationDate',
      'planting.pest_control_date as pestControlDate',
      'planting.user_id as userId',
      'plants.id as id',
      'plants.name as name',
      'plants.type as type',
      'plants.created_at as createdAt',
      'plants.cost as cost'
    )
    .catch(err => {
      console.error('Database: getPlants has error', err.message)
    })
}

function addPlant (plant, db = connection) {
  const { name, type, cost, plantingDate, reapOrPropagationDate, fertilizationDate, pestControlDate, auth0Id } = plant

  const event = new Date()
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
  const createdAt = event.toLocaleDateString('sv-SE', options)

  const input = { name, type, created_at: createdAt, cost }

  return db('plants')
    .insert(input)
    .then(([id]) => {
      const newPlant = {
        planting_date: plantingDate,
        reap_propagation_date: reapOrPropagationDate,
        fertilization_date: fertilizationDate,
        pest_control_date: pestControlDate,
        user_id: auth0Id
      }
      return db('planting')
        .insert(newPlant)
    })
    .catch(err => {
      console.error('Database: addPlant has error', err.message)
    })
}

function updatePlant (id, plant, db = connection) {
  const { name, type, cost, plantingDate, reapOrPropagationDate, fertilizationDate, pestControlDate } = plant
  const updatePlant = {
    name,
    type,
    cost
  }
  return db('plants')
    .where('id', id)
    .update(updatePlant)
    .then(() => {
      const editPlant = {
        planting_date: plantingDate,
        reap_propagation_date: reapOrPropagationDate,
        fertilization_date: fertilizationDate,
        pest_control_date: pestControlDate
      }
      return db('planting')
        .where('planting.id', id)
        .update(editPlant)
    })
    .catch(err => {
      console.error('Database: updatePlant has error', err.message)
    })
}

function delPlant (id, db = connection) {
  return db('plants')
    .where('id', id)
    .del()
    .then(() => {
      return db('planting')
        .where('planting.id', id)
        .del()
    })
    .catch(err => {
      console.error('Database: delPlant has error', err.mess)
    })
}
