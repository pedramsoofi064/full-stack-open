const Blog = require('../models/blog')
const User = require('../models/user')


const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const initialBlogs = [
  {
    'title': 'any Title',
    'author': 'Pedram soofi',
    'url': 'https://google2.com',
    'likes': 58,
  },
  {
    'title': 'Some Title',
    'author': 'Pedram soofi',
    'url': 'https://google22.com',
    'likes': 99,
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    'title': 'test Title',
    'author': 'Pedram Soofi',
    'url': 'https://google.com',
    'likes': 80,
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const notes = await Blog.find({})
  return notes.map(note => note.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
}