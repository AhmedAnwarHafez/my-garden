const express = require('express')

const db = require('../db/users')
const { getUserRoles } = require('../auth0')
const router = express.Router()

router.get('/', (req, res) => {
  db.getUsers()
    .then(users => {
      res.json({ users })
      return null
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ message: 'Somthing went wrong' })
    })
})

router.post('/', async (req, res) => {
  const { auth0Id, name, email, description } = req.body
  const user = { auth0Id, name, email, description }

  try {
    await db.addUser(user)
    res.sendStatus(201)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'unable to insert user into the database' })
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const roles = await getUserRoles(id)
    res.json({ roles })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: 'unable to retrieve user roles' })
  }
})

module.exports = router
