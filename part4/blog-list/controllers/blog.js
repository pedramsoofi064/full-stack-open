const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user.js')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
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

blogsRouter.post('/', async (request, response, next) => {
  const { title, author, url, likes } = request.body
  const user = await User.findById(request.user)


  const blog = new Blog({
    title, author, url, likes, user: user._id

  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  user._id = user._id.toString()
  await user.save()
  response.json(savedBlog.toJSON())
})


blogsRouter.delete('/:id', async (request, response) => {

  const blog = await Blog.findById(request.params.id)
  if (!blog || !blog.user) {
    return response.status(404).json({ error: 'Not found' })
  }

  if (blog.user.toString() === request.user) {

    await Blog.findByIdAndDelete(request.params.id)
    const user = await User.findById(request.user)
    user.blogs = user.blogs.filter((blog) => (blog.toString() !== request.params.id))
    await user.save()
    response.status(204).end()
  } else {
    return response.status(404).json({ error: 'Not found*' })
  }


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