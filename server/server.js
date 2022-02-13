const express = require('express')
const db = require('./db/plants')
const path = require('path')
const multer = require('multer')
const helpers = require('./helpers')

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

// const storage = multer.diskStorage({
//   destination: 'server/public/images/uploads',
//   filename: function (req, file, cb) {
//     cb(null, 'IMAGE-' + Date.now() + path.extname(file.originalname))
//   }
// })

// server.post('/upload-profile-pic', (req, res) => {
//   const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1000000 }
//   }).single('profile_pic')

//   upload(req, res, (err) => {
//     console.log('Request ---', req.body)
//     console.log('Request file ---', req.file)// Here you get file.
//     /* Now do where ever you want to do */
//     if (!err) { return res.send(req.file) }
//   })
// })

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

server.post('/upload-profile-pic/:id', (req, res) => {
  const { id } = req.params
  // 'profile_pic' is the name of our file input field in the HTML form
  const upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('profile_pic')
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

    db.addImage(id, req.file.filename)
      .then(() => {
        res.sendStatus(201)
        return null
      })
      .catch(err => {
        res.status(500).send('server: add image has error', err.message)
      })

    console.log(req.file.filename)
    // Display uploaded image for user validation
    // res.send(`You have uploaded this image: <hr/><img src="images/uploads/${req.file.filename}" width="500"><hr /><a href="./">Upload another image</a>`)
    res.send(req.file.filename)
  })
})

// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/images/uploads')
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname)
//   }
// })

// const upload = multer({ storage })

// server.use(cors())

// server.post('/upload', upload.single('image'), (req, res) => {
//   console.log('req.file')
//   if (req.file) {
//     res.json({
//       imageUrl: `images/uploads/${req.file.filename}`
//     })
//   } else { res.status('409').json('No Files to Upload.') }
// })
