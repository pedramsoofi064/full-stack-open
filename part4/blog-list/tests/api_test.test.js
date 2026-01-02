const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blogs')
const { test, beforeEach, describe, after, } = require('node:test')
const assert = require('node:assert')


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('viewing a specific blog and creating one', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
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
        const blogsLengthBefore = (await api.get('/api/blogs'))
            .body.length
        await api
            .post('/api/blogs')
            .send(blog)
        const blogsLengthAfter = (await api.get('/api/blogs'))
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
            .send(blog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogs = (await api.get('/api/blogs')).body
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
            .send(blog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.notEqual(response.body.id, null)

        blog.id = response.body.id;

        await api.delete('/api/blogs/' + blog.id).expect(204)
        await api.delete('/api/blogs/' + blog.id).expect(404)
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

        const updateResponse = await api.put('/api/blogs/' + blog.id).send(editedBlog).expect(200);
        const updatedBlog = await api.get('/api/blogs/' + blog.id)
        assert.deepStrictEqual(updateResponse.body, updatedBlog.body)

    })

})


after(() => {
    mongoose.connection.close()
})