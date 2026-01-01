const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithOneBlog.concat(listWithOneBlog))
    assert.strictEqual(result, 10)
  })
})

describe('favorite blog', () => {
  const blogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'testBlog1',
      author: 'test author1',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'testBlog2',
      author: 'test author2',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 15,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f7',
      title: 'testBlog3',
      author: 'test author3',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 0,
      __v: 0
    },
  ]

  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog([])
    assert.strictEqual(result, null)
  })

  test('when list has only one blog, it returns that one', () => {
    const result = listHelper.favoriteBlog([blogs[0]])
    assert.deepStrictEqual(result, blogs[0])
  })

  test('when list has multiple blogs, it returns one the right one', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[1])
  })
})

describe('most blogs', () => {
  const blogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'testBlog1',
      author: 'test author1',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'testBlog2',
      author: 'test author2',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 15,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f7',
      title: 'testBlog3',
      author: 'test author3',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17b9',
      title: 'testBlog5',
      author: 'test author2',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 15,
      __v: 0
    },
    {
      _id: '5a422aa71b54a6762f4d17f9',
      title: 'testBlog4',
      author: 'test author2',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 15,
      __v: 0
    },
  ]

  test('of empty list is null', () => {
    const result = listHelper.mostBlogs([])
    assert.strictEqual(result, null)
  })

  test('when list has only one blog, it returns that one', () => {
    const result = listHelper.mostBlogs([blogs[0]])
    assert.deepStrictEqual(result, {
      author: 'test author1',
      blogs: 1
    })
  })

  test('when list has multiple blogs, it returns one the right one', () => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, {
      author: 'test author2',
      blogs: 3
    })
  })
})

describe('most likes', () => {
  const blogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'testBlog1',
      author: 'test author1',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'testBlog2',
      author: 'test author2',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 15,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f7',
      title: 'testBlog3',
      author: 'test author3',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17b9',
      title: 'testBlog5',
      author: 'test author2',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 15,
      __v: 0
    },
    {
      _id: '5a422aa71b54a6762f4d17f9',
      title: 'testBlog4',
      author: 'test author2',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 15,
      __v: 0
    },
  ]

  test('of empty list is null', () => {
    const result = listHelper.mostLikes([])
    assert.strictEqual(result, null)
  })

  test('when list has only one blog, it returns that one', () => {
    const result = listHelper.mostLikes([blogs[0]])
    assert.deepStrictEqual(result, {
      author: 'test author1',
      likes: 5
    })
  })

  test('when list has multiple blogs, it returns one the right one', () => {
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, {
      author: 'test author2',
      likes: 45
    })
  })
})