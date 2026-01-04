import { useState } from 'react'

const newBlogForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = (event) => {
    event.preventDefault()
    handleSubmit({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')

  }

  return (
    <form onSubmit={handleCreate} style={{ marginBottom: '2rem' }}>
      <h2>Create New</h2>
      <div>
        title
        <input
          type="text"
          value={title}
          id="title"
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          id="author"
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          id="url"
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id="createBlog" type="submit">create</button>
    </form>
  )
}

export default newBlogForm