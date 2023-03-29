import { useState, forwardRef, useImperativeHandle } from 'react'
import { deleteOne, likeOne } from '../reducers/blogReducer'
import { checkUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const Blog = forwardRef((props, refs) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    try {
      if (window.confirm(`remove the blog ${props.title} by ${props.author}?`)) {
        await props.blogService.erase(props.blogId)
        dispatch(deleteOne(props.blogId))
      } else {
        return
      }
    } catch(exception) {
      props.setErrorMessage(exception.message)
      setTimeout(() => {
        props.setErrorMessage(null)
      }, 2000)

    }
  }

  const handleLikes =  async (event) => {
    event.preventDefault()
    dispatch(checkUser())
    await props.updateLikes(props.blogId, { title: props.title, author: props.author, likes: Number(props.likes) + 1, url: props.url, user: props.user })
    dispatch(likeOne(props.blogId))
  }

  return (
    <div style={blogStyle}>

      <div style={hideWhenVisible} className='shortInfo'>

        {props.title} {props.author}

        <button onClick={toggleVisibility} className='viewButton'>view</button>

      </div>

      <div style={showWhenVisible} className='longInfo'>

        {props.title} {props.author}

        <button onClick={toggleVisibility}>hide</button>
        <br/>
        {props.url}
        <br/>
      likes: <div>{props.likes}</div> <button onClick={handleLikes}>like</button>
        <br/>
        {props.user}
        <br/>
        <button onClick={handleDelete}>delete</button>
        <br/>
      </div>
    </div>
  )
}


)

Blog.displayName = 'Blog'

export default Blog