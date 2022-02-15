import { FETCH_IMAGES_SUCCESS } from '../actions/images'

const initialState = []

export default function images (state = initialState, action) {
  switch (action.type) {
    case FETCH_IMAGES_SUCCESS:
      return action.imageNames
    default:
      return state
  }
}
