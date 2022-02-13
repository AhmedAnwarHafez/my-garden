import { getPlants, addPlant, updatePlant, deletePlant, addImages } from '../apis/plants'
export const FETCH_PLANTS_PENDING = 'FETCH_PLANTS_PENDING'
export const FETCH_PLANTS_SUCCESS = 'FETCH_PLANTS_SUCCESS'
export const FETCH_IMAGES_SUCCESS = 'FETCH_IMAGES_SUCCESS'

export function fetchPlants (auth0Id) {
  return dispatch => {
    dispatch(fetchPlantsPending())
    return getPlants(auth0Id)
      .then(plants => {
        dispatch(fetchPlantsSuccess(plants))
        return null
      })
      .catch(err => {
        console.error('actions: fetchPlants has error', err.message)
      })
  }
}

export function addThePlant (plant) {
  return addPlant(plant)
    .catch(err => {
      console.error('action: addThePlant has error', err.message)
    })
}

export function updateThePlant (id, plant) {
  return updatePlant(id, plant)
    .catch(err => {
      console.error('action: updateThePlant has error', err.message)
    })
}

export function delPlant (id) {
  return deletePlant(id)
    .catch(err => {
      console.error('action: delPlant has error', err.message)
    })
}

export function getImages (formData, config, id) {
  return dispatch => {
    return addImages(formData, config, id)
      .then(imageNames => {
        dispatch(fetchImagesSuccess(imageNames))
        return null
      })
      .catch(err => {
        console.error('actions: getImages has error', err.message)
      })
  }
}

export function fetchPlantsPending () {
  return {
    type: FETCH_PLANTS_PENDING
  }
}

export function fetchPlantsSuccess (plants) {
  return {
    type: FETCH_PLANTS_SUCCESS,
    plants
  }
}

export function fetchImagesSuccess (imageNames) {
  return {
    type: FETCH_IMAGES_SUCCESS,
    imageNames
  }
}
