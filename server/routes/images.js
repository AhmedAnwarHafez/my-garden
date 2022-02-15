const express = require('express')
const db = require('../db/images')
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
