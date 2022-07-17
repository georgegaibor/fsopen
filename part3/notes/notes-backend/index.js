require('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const { errorHandler } = require('./middleware/errorHandlerMware')
const { unknownEndpoint } = require('./middleware/unknownEndpointMware')

const app = express()
const Note = require('./models/note')

app.use(express.json())

morgan.token('data', (req) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status'))
app.use(cors())
app.use(express.static('build'))

//HOME
app.get('/', (_req, res) => {
  res.send('<h1>Hello World!</h1>')
})

//READ ALL
app.get('/api/notes', (_req, res) => {
  Note.find({}).then(notes => {
    res.json(notes)
  })
})

//ADD NOTE
app.post('/api/notes', (req, res, next) => {
  const body = req.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save().then(savedNote => {
    res.json(savedNote)
  })
    .catch(error => next(error))
})


//READ INDIVIDUAL
app.get('/api/notes/:id', (req, res, next) => {
  Note.findById(req.params.id).then(note => {
    if(note){
      res.json(note)
    } else {
      res.status(404).end()
    }
  })
    .catch( error => {
      next(error)
    })
})

//UPDATE
app.put('/api/notes/:id', (req, res, next) => {
  const { content, important } = req.body

  Note.findByIdAndUpdate(req.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedNote => {
      res.json(updatedNote)
    })
    .catch(error => next(error))
})

//DELETE
app.delete('/api/notes/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
