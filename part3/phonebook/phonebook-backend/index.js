require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const { unknownEndpoint } = require('./middleware/unknownEndpointMware')
const { errorHandler } = require('./middleware/errorHandlerMware')

const app = express()
const Person = require('./models/person')

app.use(express.json())

morgan.token('data', (req) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :data :res[content-length] :response-time ms'))

app.use(cors())
app.use(express.static('build'))

//GET HOME
app.get('/info', (_request, response) => {
  Person.estimatedDocumentCount().then( count => {
    response.send(
      `
      <p>Phonebook has info for ${count} people</p>
      <p>${new Date()}</p>
      `
    )
  })
})

//GET ALL
app.get('/api/persons', (request, response) => {
  Person.find({}).then(notes => {
    response.json(notes)
  })
})

//GET ONE
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(note => {
    if(note){
      response.json(note)
    } else {
      response.status(404).end()
    }
  })
    .catch( error => {
      next(error)
    })
})

//DELETE
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

//POST
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})

//UPDATE
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`${PORT}`)
})
