const express = require('express')
const db = require('../db/plants')
const router = express.Router()
module.exports = router

// GET api/v1/plants/auth0Id

router.get('/:auth0Id', (req, res) => {
  const auth0Id = req.params.auth0Id
  setTimeout(() => {
    db.getPlants(auth0Id)
      .then(plants => {
        res.json(plants)
        return null
      })
      .catch(err => {
        console.error(err)
        res.status(500).json({ message: 'router: GET has error' })
      })
  }, 1000)
})

// router.get('/', async (req, res) => {
//   const auth0Id = req.body.auth0Id
//   try {
//     const plants = await db.getPlants(auth0Id)
//     res.json(plants)
//   } catch (err) {
//     res.status(500).json('router: GET has error', err.message)
//   }
// })

// POST api/v1/plants/add

router.post('/add', (req, res) => {
  const plant = req.body
  db.addPlant(plant)
    .then(() => {
      res.sendStatus(201)
      return null
    })
    .catch(err => {
      res.status(500).send('router: POST has error', err.message)
    })
})

// Patch api/v1/plants/update

router.patch('/update/:id', (req, res) => {
  const { id } = req.params
  const editPlant = req.body
  db.updatePlant(id, editPlant)
    .then(() => {
      res.sendStatus(200)
      return null
    })
    .catch(err => {
      res.status(500).send('router: PATCH has error', err.message)
    })
})

// Delete api/v1/plants/del

// router.delete('/del', (req, res) => {
//   const id = req.body.id
//   db.delPlant(id)
//     .then(() => {
//       res.sendStatus(200)
//       return null
//     })
//     .catch(err => {
//       res.status(500).send('router: Delete has error', err.message)
//     })
// })

router.delete('/del', async (req, res) => {
  const { id } = req.body
  console.log(id)
  try {
    await db.delPlant(id)
    res.sendStatus(200)
  } catch (err) {
    console.log(err.message)
  }
})
