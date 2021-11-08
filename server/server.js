const express = require('express')
const path = require('path')

const publicRoutes = require('./routes/public')
const protectedRoutes = require('./routes/protected')
const privateRoutes = require('./routes/private')
const usersRoutes = require('./routes/users')
const plantsRoutes = require('./routes/plants')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/users', usersRoutes)
server.use('/api/v1/public', publicRoutes)
server.use('/api/v1/protected', protectedRoutes)
server.use('/api/v1/private', privateRoutes)
server.use('/api/v1/plants', plantsRoutes)

module.exports = server
