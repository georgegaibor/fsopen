const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (_request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(newBlog => {
      response.status(201).json(newBlog)
    })
})

module.exports = blogRouter
