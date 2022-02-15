import { FETCH_PLANTS_SUCCESS } from '../actions/plants'

const initialState = []

export default function plants (state = initialState, action) {
  switch (action.type) {
    case FETCH_PLANTS_SUCCESS:
      return action.plants
    default:
      return state
  }
}
