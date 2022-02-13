import { combineReducers } from 'redux'

import users from './users'
import user from './user'
import plants from './plants'
import waiting from './waiting'
import images from './images'

export default combineReducers({
  users,
  user,
  plants,
  waiting,
  images
})
