const dummy = (blogs) => {
    console.log('inside the Dummy function', blogs);
    return 1
}

const totalLikes = (blogs) => {
    let sum = blogs.reduce((acc, item) => {
        return (acc + item.likes)
    }, 0)
    return sum
}

const favoriteBlog = (blogs) => {
    if (!blogs || blogs.length === 0) {
        return null
    }
    let favorite = {
        ...blogs[0]
    }
    for (const item of blogs) {
        if (item.likes > favorite.likes) {
            favorite = {
                ...item
            }
        }
    }
    return favorite
}

const mostBlogs = (blogs) => {

    if (!blogs || blogs.length === 0) {
        return null
    }

    const authorWithBlogCount = {}
    blogs.forEach((item) => {
        if (!authorWithBlogCount[item.author])
            authorWithBlogCount[item.author] = 1
        else
            authorWithBlogCount[item.author] += 1
    })

    const result = Object.entries(authorWithBlogCount).sort((a, b) => {
        return a[1] - b[1]
    }).map(item => ({ author: item[0], blogs: item[1] }))
    return result.pop()
}

const mostLikes = (blogs) => {

    if (!blogs || blogs.length === 0) {
        return null
    }

    const authorWithLikesCount = {}
    blogs.forEach((item) => {
        if (!authorWithLikesCount[item.author])
            authorWithLikesCount[item.author] = item.likes
        else
            authorWithLikesCount[item.author] += item.likes
    })

    const result = Object.entries(authorWithLikesCount).sort((a, b) => {
        return a[1] - b[1]
    }).map(item => ({ author: item[0], likes: item[1] }))
    return result.pop()
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}