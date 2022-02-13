import { FETCH_PLANTS_SUCCESS, FETCH_IMAGES_SUCCESS } from '../actions/plants'

const initialState = []

export default function plants (state = initialState, action) {
  const imageNames = action.imageNames
  console.log(imageNames)
  switch (action.type) {
    case FETCH_PLANTS_SUCCESS /* || FETCH_IMAGES_SUCCESS */:
      // return action.plants
      return action.plants.map(plant => {
        console.log(plant)
        if (imageNames === true) {
          console.log('here ' + imageNames)
          imageNames.includes(`id:${plant.id}`)
            ? plant.imageName = imageNames
            : plant.imageName = ''
          return plant
        } else { return plant }
      })
      //   action.imageNames.includes(`id:${plant.id}`)
      //     ? plant.imageName = action.imageNames
      //     : plant.imageName = ''
      //   return plant
      // })
    default:
      return state
  }
}
