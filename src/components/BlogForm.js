import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  //ADDED BELOW
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleURLChange = (event) => {
    setNewURL(event.target.value)
  }

  const createBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: newTitle,
      author: newAuthor,
      url: newURL,
      likes: 0,
      comments: ['initial comment']
    })
    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
  }

  return(
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={createBlog}>
        <p>Title</p>
        <input
          value={newTitle}
          id="title"
          placeholder="title"
          onChange={handleTitleChange}
        />
        <p>Author</p>
        <input
          value={newAuthor}
          id="author"
          placeholder="author"
          onChange={handleAuthorChange}
        />
        <p>URL</p>
        <input
          value={newURL}
          id="url"
          placeholder="url"
          onChange={handleURLChange}
        />
        <button type="submit" id="blogFormButton">save</button>
      </form>
    </div>
  )
}

export default BlogForm