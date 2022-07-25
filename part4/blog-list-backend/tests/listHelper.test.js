const {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes } = require('../utils/listHelper')
const blogs = require('./mock/blogs')

test('dummy returns one', () => {
  const result = dummy()
  expect(result).toBe(1)
})

describe('Total likes of', () => {

  test('empty list returns zero', () => {
    const emptyTestList = []

    const result = totalLikes(emptyTestList)
    expect(result).toBe(0)
  })

  test('only one blog equals its likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    const result = totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = totalLikes(blogs)
    expect(result).toBe(36)
  })

})

describe('Favorite blog', () => {

  test('of empty list returns empty object', () => {
    const emptyBlogs = []
    const result = favoriteBlog(emptyBlogs)

    expect(result).toEqual({})
  })

  test('of a bigger list returns the first blog with most likes', () => {
    const result = favoriteBlog(blogs)
    const testFavorite = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }

    expect(result).toEqual(testFavorite)
  })

})

describe('Most blogs', () => {

  test('of empty list returns empty object', () => {
    const emptyBlogs = []
    const result = mostBlogs(emptyBlogs)

    expect(result).toEqual({})
  })

  test('of a bigger list returns author who has written the largest amount of blogs', () => {
    const result = mostBlogs(blogs)
    const mostBlogsTestResult = {
      author: 'Robert C. Martin',
      blogs: 3
    }

    expect(result).toEqual(mostBlogsTestResult)
  })
})

describe('Most likes', () => {

  test('of empty list returns empty object', () => {
    const emptyBlogs = []
    const result = mostLikes(emptyBlogs)

    expect(result).toEqual({})
  })

  test('of a bigger list returns author with the largest amount of likes', () => {
    const result = mostLikes(blogs)
    const mostLikesTestResult = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }

    expect(result).toEqual(mostLikesTestResult)
  })
})
