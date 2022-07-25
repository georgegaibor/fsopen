const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogList) => {

  if (blogList.length === 0) {
    return 0
  } else if (blogList.length === 1) {
    return blogList[0].likes
  }

  const reducer = (sum, currentBlog) => {
    return sum + currentBlog.likes
  }

  return blogList.reduce(reducer, 0)
}

const favoriteBlog = (blogList) => {

  if (blogList.length === 0) {
    return {}
  }

  const favoriteBlog = _.maxBy(blogList, 'likes')

  const relevantInfo = {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes,
  }
  return relevantInfo
}

const mostBlogs = (blogList) => {

  if (blogList.length === 0) {
    return {}
  }

  const authorsAndBlogs = _.groupBy(blogList, 'author')
  const result = {
    author: '',
    blogs: 0
  }

  _.forEach(authorsAndBlogs, function(blogs, author){
    if(blogs.length > result.blogs){
      result.author = author,
      result.blogs = blogs.length
    }
  })

  return result
}

const mostLikes = (blogList) => {

  if (blogList.length === 0) {
    return {}
  }

  const authorsAndBlogs = _.groupBy(blogList, 'author')
  const result = {
    author: '',
    likes: 0
  }

  _.forEach(authorsAndBlogs, function(blogs, author){
    const likes = totalLikes(blogs)
    if(likes > result.likes) {
      result.author = author
      result.likes = likes
    }
  })

  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
