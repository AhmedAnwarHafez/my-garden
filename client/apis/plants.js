import request from 'superagent'
const rootUrl = '/api/v1/plants'

export function getPlants (auth0Id) {
  return request.get(rootUrl + '/' + auth0Id)
    .then((res) => {
      return res.body
    })
    .catch(err => {
      console.error('api: getPlants has error', err.message)
    })
}

export function addPlant (plant) {
  return request.post(rootUrl + '/add')
    .send(plant)
    .catch(err => {
      console.error('api: addPlant has error', err.message)
    })
}

export function updatePlant (id, editPlant) {
  return request.patch(rootUrl + '/update/' + id)
    .send(editPlant)
    .catch(err => {
      console.error('api: updatePlant has error', err.message)
    })
}

export function deletePlant (id) {
  return request.delete(rootUrl + '/del')
    .send({ id })
    .catch(err => {
      console.error('api: deletePlant has error', err.message)
    })
}
