import request from 'superagent'
import axios from 'axios'
const rootUrl = '/api/v1/images'

export function getImages () {
  return request.get(rootUrl + '/')
    .then((res) => {
      console.log('api: ' + res)
      return res.body
    })
    .catch(err => {
      console.error('api: getImages has error', err.message)
    })
}

export function addImages (formData, config, id) {
  return axios.post('/upload-profile-pic/' + id, formData, config)
    .then(() => {
      console.log('api: addImages is successful.')
      return null
    })
    .catch(err => {
      console.error('api: addImages has error', err.message)
    })
}
