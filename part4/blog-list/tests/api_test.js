const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { test, beforeEach, describe, after, } = require('node:test')
const assert = require('node:assert')
let token = ''
beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const newUser = {
        'blogs': [],
        'username': 'test',
        'name': 'pedram',
        'password': '123456'
    }

    await api
        .post('/api/users')
        .send(newUser)
    const result = await api
        .post('/api/login')
        .send(newUser)

    token = result.body.token

    await Blog.insertMany(helper.initialBlogs)
})

describe('viewing a specific blog and creating one', () => {

    test('blogs are returned as json', async () => {        
        await api
            .get('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs').set('Authorization', `bearer ${token}`)

        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('verifying the existence of id', async () => {
        const blogs = await Blog.find({})
        assert.notEqual(blogs[0].id, null);
    })

    test('add new blog to blogs', async () => {
        const blog = {
            title: 'another Title',
            author: 'some author',
            url: 'https://test.com',
            likes: 222
        }
        const blogsLengthBefore = (await api.get('/api/blogs').set('Authorization', `bearer ${token}`)
        )
            .body.length
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(blog)
        const blogsLengthAfter = (await api.get('/api/blogs').set('Authorization', `bearer ${token}`)
        )
            .body.length

        assert.equal(blogsLengthAfter, blogsLengthBefore + 1)

    })
})


describe('test default value consideration', () => {
    test('if likes property missed, it will consider as 0', async () => {
        await Blog.deleteMany({})

        const blog = {
            title: 'another Title Two',
            author: 'another title',
            url: 'https://test.com',
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(blog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogs = (await api.get('/api/blogs').set('Authorization', `bearer ${token}`)
        ).body
        assert.equal(blogs[0].likes, 0)
    })
})



describe('test error scenarios', () => {
    test('if url or title missed, it returns 400 error', async () => {
        const blog = {
            author: 'test author',
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(blog)
            .expect(400)

    })
})

describe('creating and deleting new blog', () => {
    const blog = {
        title: 'another Title',
        author: 'some author',
        url: 'https://test.com',
        likes: 222
    }


    test('create and delete blog and try again', async () => {
        const response = await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(blog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.notEqual(response.body.id, null)

        blog.id = response.body.id;

        await api
            .delete('/api/blogs/' + blog.id)
            .set('Authorization', `bearer ${token}`)
            .expect(204)
        await api
            .delete('/api/blogs/' + blog.id)
            .set('Authorization', `bearer ${token}`)
            .expect(404)
    })

})

describe('creating and deleting new blog', () => {
    const blog = {
        title: 'another Title',
        author: 'some author',
        url: 'https://test.com',
        likes: 222
    }


    test('create and edit blog', async () => {
        const response = await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(blog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.notEqual(response.body.id, null)

        blog.id = response.body.id;
        const editedBlog = {
            title: 'edited title',
            author: 'some author',
            url: 'https://test.com',
            likes: 22
        }

        const updateResponse = await api
            .put('/api/blogs/' + blog.id)
            .set('Authorization', `bearer ${token}`)
            .send(editedBlog).expect(200);
        const updatedBlog = await api.get('/api/blogs/' + blog.id).set('Authorization', `bearer ${token}`)

        assert.deepStrictEqual(updateResponse.body, updatedBlog.body)
    })

})

describe('test user api with one user', () => {
   
    test('creation succeeds with a new username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'pedraaam',
            name: 'Pedram Soofi',
            password: '123456',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.equal(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert.ok(usernames.includes(newUser.username))
    })

    test('get error while tries to add duplicate username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'test',
            name: 'Superuser',
            password: '123456',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.equal(usersAtEnd.length, usersAtStart.length)
    })
})



after(() => {
    mongoose.connection.close()
})