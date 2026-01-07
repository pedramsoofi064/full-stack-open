const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {

  const user = {
    name: 'Matti Luukkainen',
    username: 'mluukkai',
    password: 'salainen'
  }
  const secondUser = {
    name: 'Pedram Soofi',
    username: 'pedrams',
    password: '123456'
  }

  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: user
    })
    await request.post('http://localhost:3003/api/users', {
      data: secondUser
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const formTitle = page.getByText('Log in to application');
    await expect(formTitle).toBeVisible();

    const loginBtn = page.getByRole('button', { name: 'login' })
    await expect(loginBtn).toBeVisible();
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, user.username, user.password);

      await expect(page.getByText(`${user.name} logged in.`)).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, user.username, "wrong pass");

      const errorDiv = page.locator('.message')
      console.log(errorDiv)
      await expect(errorDiv).toContainText('invalid username or password')
      await expect(errorDiv).toHaveCSS('border-color', 'rgb(255, 0, 0)')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, user.username, user.password);
      await expect(page.getByText(`${user.name} logged in.`)).toBeVisible()
    })

    const testBlog = {
      title: "testing title",
      author: "testing author",
      url: "testing url",
    };
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, testBlog);
      await expect(page.getByText(`a new Blog ${testBlog.title} by ${testBlog.author} added`)).toBeVisible()
      await expect(page.getByText(`${testBlog.title} ${testBlog.author}`)).toBeVisible()
    })

    test('blog can be liked', async ({ page }) => {
      await createBlog(page, testBlog);

      await page.getByRole('button', { name: 'view' }).click()

      const likeNumber = page.locator('.like-number')

      const initialText = await likeNumber.textContent()
      const initialLikes = Number(initialText.match(/\d+/)[0])

      await page.getByRole('button', { name: 'like' }).click()

      await expect(likeNumber).toHaveText(`likes ${initialLikes + 1}`)

    })

    test('test that ensures that the user who added the blog can delete the blog', async ({ page }) => {
      await createBlog(page, testBlog);
      await page.getByRole('button', { name: 'view' }).click();

      page.on('dialog', dialog => dialog.accept())

      await page.getByRole('button', { name: 'remove' }).click();


      await expect(page.getByText(`${testBlog.title} ${testBlog.author}`)).not.toBeVisible()


    })

    test('test that ensures that only the user who added the blog sees the delete blog button', async ({ page }) => {
      await createBlog(page, testBlog);
      await page.getByRole('button', { name: 'view' }).click();

      await expect(page.getByRole('button', { name: 'remove' })).toBeVisible();

      await page.getByRole('button', { name: 'logout' }).click();
      await loginWith(page, secondUser.username, secondUser.password);
      await page.getByRole('button', { name: 'view' }).click();
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible();

    })

    test('test to ensure that blogs are arranged in order of likes, with the blog with the most likes first.', async ({ page }) => {

      await createBlog(page, {
        title: 'Least liked',
        author: 'Author 1',
        url: 'url1',
      });
      await createBlog(page, {
        title: 'Most liked',
        author: 'Author 2',
        url: 'url2',
      });
      await createBlog(page, {
        title: 'Medium liked',
        author: 'Author 3',
        url: 'url3',
      });

      const viewButtons = page.getByRole('button', { name: 'view' })

      await expect(viewButtons).toHaveCount(3)

      while (await viewButtons.count() > 0) {
        await viewButtons.first().click()
      }

      const blogIds = await page.locator('.blog').evaluateAll(elements =>
        elements.map(el => el.id)
      )

      const likeCount = [3, 8, 5];
      for (let i = 0; i < likeCount.length; i++) {
        const blog = page.locator(`[id="${blogIds[i]}"]`)
        const likeLabel = blog.locator('.like-number')

        for (let j = 0; j < likeCount[i]; j++) {
          await blog.getByRole('button', { name: 'like' }).click()
        }

        await expect(likeLabel).toHaveText(`likes ${likeCount[i]}`)
      }

      const likeElements = await page.locator('.like-number').all()

      const uiLikeCount = []
      for (const likeElm of likeElements) {
        const initialText = await likeElm.textContent()
        const likeCount = Number(initialText.match(/\d+/)[0])
        uiLikeCount.push(likeCount);
      }

      likeCount.sort((a, b) => b - a)
      expect(likeCount).toEqual(uiLikeCount)
    })

  })
})