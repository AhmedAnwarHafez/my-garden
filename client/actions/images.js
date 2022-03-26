import { getImages, addImages, delImage } from '../apis/images'
export const FETCH_IMAGES_SUCCESS = 'FETCH_IMAGES_SUCCESS'

export function fetchImages () {
  return dispatch => {
    return getImages()
      .then(imageNames => {
        // console.log('action: ' + imageNames)
        dispatch(fetchImagesSuccess(imageNames))
        return null
      })
      .catch(err => {
        console.error('actions: fetchImages has error', err.message)
      })
  }
}

export function addTheImages (formData, config, id) {
  return dispatch => {
    return addImages(formData, config, id)
      .then(() => {
        console.log('actions: addTheImages is successful.')
        return null
      })
      .catch(err => {
        console.error('actions: getImages has error', err.message)
      })
  }
}

export function delTheImage (id) {
  return delImage(id)
    .then(() => {
      console.log('actions: DelTheImage is successful')
      return null
    })
    .catch(err => {
      console.error('actions: DelTheImage has error', err.message)
    })
}

export function fetchImagesSuccess (imageNames) {
  return {
    type: FETCH_IMAGES_SUCCESS,
    imageNames
  }
}
