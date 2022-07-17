const unknownEndpoint = (_request, response) => {
  response.status(400).send({ error: 'unknown endpoint' })
}

module.exports = {
  unknownEndpoint,
}
