const express = require('express')
const db = require('../db/images')
const path = require('path')
const multer = require('multer')
const helpers = require('../helpers')
const router = express.Router()
module.exports = router

// GET api/v1/images

router.get('/', (req, res) => {
  db.getImages()
    .then(images => {
      res.json(images)
      return null
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ message: 'router: GETImages has error' })
    })
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'server/public/images/uploads')
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    const { id } = req.params
    cb(null, 'id:' + id + '-' + file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

// POST api/v1/images

router.post('/upload-plant-pic/:id', (req, res) => {
  // 10 is the limit I've defined for number of uploaded files at once
  // 'multiple_images' is the name of our file input field
  const { id } = req.params

  const upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).array('plant_pic', 10)

  upload(req, res, function (err) {
    // console.log(req.files)
    // req.files contains information of uploaded file
    if (req.fileValidationError) {
      return res.send(req.fileValidationError)
    } else if (!req.files) {
      return res.send('Please select an image to upload')
    } else if (err instanceof multer.MulterError) {
      return res.send(err)
    } else if (err) {
      return res.send(err)
    }

    // Add images by array
    const picNames = req.files.map(file => {
      return {
        plant_id: id,
        image_name: file.filename
      }
    })

    db.addImages(picNames)
      .then(() => {
        res.status(201)
        return null
      })
      .catch(err => {
        res.status(500).send('server: add image has error', err.message)
      })

    // Add images by object
    // req.files.map(file => {
    //   db.addImages(id, file.filename)
    //     .then(() => {
    //       res.status(201)
    //       return null
    //     })
    //     .catch(err => {
    //       res.status(500).send('server: add image has error', err.message)
    //     })
    // })
  })
})
