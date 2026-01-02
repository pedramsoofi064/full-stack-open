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

blogsRouter.delete('/:id', (request, response, next) => {
  const { id } = request.params
  Blog.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
  const { id } = request.params
  const { title, author, url, likes } = request.body

  Blog.findById(id)
    .then(blog => {
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
    .catch(error => next(error))
})

module.exports = blogsRouter