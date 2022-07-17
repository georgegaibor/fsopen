const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogController')
const { requestLogger } = require('./middleware/requestLogMware')
const { errorHandler } = require('./middleware/errorHandlerMware')
const { unknownEndpoint } = require('./middleware/unknownEndpointMware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to MongoDB')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use('/api/blogs', blogRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
