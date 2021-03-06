const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError'){
    return response.status(400).send({ error: 'Error: Malformatted id' })
  } else if (error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError'){
    return response.status(400).send({ error: 'Error: Name already in database' })
  }

  next(error)
}

module.exports = {
  errorHandler,
}
