const connection = require('./connection')

// module.exports = {
//   getImages,
//   addImages
// }

function getImages (db = connection) {
  return db('plants_images')
    .select(
      'id',
      'image_name as imageName',
      'plant_id as plantId'
    )
    .catch(err => {
      console.error('Database: getImages has error', err.message)
    })
}

const addImages = (picNames, db = connection) => {
  return db('plants_images')
    .insert(picNames)
    .catch(err => {
      console.error('DB addImage has error', err.message)
    })
}

// Add images by object
// function addImages (id, filename, db = connection) {
//   const input = {
//     plant_id: id,
//     image_name: filename
//   }

//   return db('plants_images')
//     .insert(input)
//     .catch(err => {
//       console.error('Database: addImage has error', err.message)
//     })
// }

// Add images by array

module.exports = {
  getImages,
  addImages
}
