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
  const { id } = req.params
  // 'profile_pic' is the name of our file input field in the HTML form
  const upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('plant_pic')
  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
      return res.send(req.fileValidationError)
    } else if (!req.file) {
      return res.send('Please select an image to upload')
    } else if (err instanceof multer.MulterError) {
      return res.send(err)
    } else if (err) {
      return res.send(err)
    }

    db.addImages(id, req.file.filename)
      .then(() => {
        res.sendStatus(201)
        return null
      })
      .catch(err => {
        res.status(500).send('server: add image has error', err.message)
      })

    // Display uploaded image for user validation
    // res.send(`You have uploaded this image: <hr/><img src="images/uploads/${req.file.filename}" width="500"><hr /><a href="./">Upload another image</a>`)
    // res.send(req.file.filename)
  })
})
