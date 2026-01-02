const blogsRouter = require('express').Router()
const Blog = require('../models/blogs.js')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs)

})

blogsRouter.get('/:id', (request, response, next) => {
  const { id } = request.params

  Blog.findById(id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogsRouter.post('/', (request, response, next) => {
  const { title, author, url, likes } = request.body
  const blog = new Blog({
    title, author, url, likes
  })

  blog.save()
    .then(savedBlog => {
      response.json(savedBlog)
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'Not found' })
  }
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()

})

blogsRouter.put('/:id', async (request, response, next) => {
  const { id } = request.params
  const { title, author, url, likes } = request.body

  const blog = await Blog.findById(id)

  if (!blog) {
    return response.status(404).end()
  }

  blog.author = author
  blog.title = title
  blog.url = url
  blog.likes = likes

  return blog.save().then((updatedBlog) => {
    response.json(updatedBlog)
  })
})

module.exports = blogsRouter