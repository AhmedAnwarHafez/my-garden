import { FETCH_PLANTS_PENDING, FETCH_PLANTS_SUCCESS } from '../actions/plants'

export default function waiting (state = false, action) {
  switch (action.type) {
    case FETCH_PLANTS_PENDING:
      return true
    case FETCH_PLANTS_SUCCESS:
      return false
    default:
      return state
  }
}
