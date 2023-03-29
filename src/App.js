import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { Table, Alert, Navbar, Nav } from 'react-bootstrap'

import Note from './components/Note'
import Guy from './components/Guy'
import Indiv from './components/Indiv'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import { getUser } from './services/user'
import { getUsers } from './services/persons'
import loginService from './services/login'
import { notification, loginNotification, createNotification, loginErrorNotification, likeNotification, commentNotification } from './reducers/notificationReducer'

import { setBlogs, addOne } from './reducers/blogReducer'
import {   addUser, eraseUser } from './reducers/userReducer'
import {   setPersons } from './reducers/personsReducer'

const Notification = () => {
  const message =  useSelector(({ notification }) => notification)
  let variantName = 'success'
  if (message === null) return
  if(message === 'wrong credentials') {
    variantName = 'warning'
  } else variantName = 'success'

  return (
    <div className="container">
      <Alert variant={variantName}>
        {message}
      </Alert>
    </div>
  )
}

const Home = (props) => {
  return (
    <div className="container">
      <p>{props.person} logged in</p>
      <Toggleable buttonLabel="new note" ref={props.blogFormRef}>
        <BlogForm
          addBlog={props.addBlog}
        />
      </Toggleable>
    </div>
  )
}

const Users = (props) => {
  return (
    <div>
      <ul>
        <li>
          <b>{props.username}</b> {props.blogslength}
        </li>
      </ul>
    </div>
  )
}

const Myblogs = (props) => {
  return (
    <div>
      <td>
        <b>{props.title}</b>
      </td>
    </div>
  )
}


const App = () => {
  const padding = {
    padding: 5
  }
  const message =  useSelector(({ notification }) => notification)
  const blogs =  useSelector(({ blogs }) => blogs)
  let persons = useSelector(({ persons }) => persons)
  let person = useSelector(({ user }) => user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogFormRef = useRef()
  const note1Ref = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      let user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      let fullUser = await getUser(user.username)
      dispatch(addUser(fullUser))
      setUsername('')
      setPassword('')
      dispatch(loginNotification())
      setTimeout(() => {
        dispatch(notification())
      }, 2000)
    } catch (exception) {
      dispatch(loginErrorNotification())
      setTimeout(() => {
        dispatch(notification())
      }, 2000)
    }
  }

  useEffect(() => {
    blogService
      .getAll().then(blogs => {
        console.log(blogs)
        dispatch(setBlogs(blogs))})
      .then(() =>  console.log(blogs))
  }, [])

  useEffect(() => {
    getUsers().then(result => dispatch(setPersons(result)))
  }, [dispatch])

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const updateLikes = (id, blogObject) => {
    blogService
      .update(id, blogObject)
      .then(() => {
        dispatch(likeNotification(`${blogObject.title}`))
        setTimeout(() => {
          dispatch(notification())
        }, 2000)
      })
      .catch((exception) => {
        dispatch(createNotification(`${exception.response.data.error}`))
        setTimeout(() => {
          dispatch(notification())
        }, 2000)
      })
  }

  const updateComments = (id, blogObject) => {
    blogService
      .update(id, blogObject)
      .then(() => {
        dispatch(commentNotification(`${blogObject.title}`))
        setTimeout(() => {
          dispatch(notification())
        }, 2000)
      })
      .catch((exception) => {
        dispatch(createNotification(`${exception.response.data.error}`))
        setTimeout(() => {
          dispatch(notification())
        }, 2000)
      })
  }

  const addComment = (blogObject, id) => {
    try {
      blogService.createComment(blogObject, id)
        .then(() => {
        })
        .then(() => {
          getUsers().then(result => dispatch(setPersons(result)))
        })
      dispatch(createNotification(`${blogObject.title}`))
      setTimeout(() => {
        dispatch(notification())
      }, 2000)
    } catch(error) {
      dispatch(createNotification(`${error.response.data.error}`))
      setTimeout(() => {
        dispatch(notification())
      }, 2000)
    }
  }

  const addBlog = (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      blogService.create(blogObject)
        .then(newblog => {
          newblog.user = person
          dispatch(addOne(newblog))
        })
        .then(() => {
        })
        .then(() => {
          getUsers().then(result => dispatch(setPersons(result)))
        })
      dispatch(createNotification(`${blogObject.title}`))
      setTimeout(() => {
        dispatch(notification())
      }, 2000)
    } catch(error) {
      dispatch(createNotification(`${error.response.data.error}`))
      setTimeout(() => {
        dispatch(notification())
      }, 2000)
    }
  }


  const handleLogoutClick = () => {
    try{
      window.localStorage.removeItem('loggedNoteappUser')
      dispatch(eraseUser())
      setLoginVisible(false)
    } catch (error) {
      // setErrorMessage('something went wrong')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 2000)
    }
  }

  return (
    <div className="container">
      <h1>Notes</h1>
      {person && <Router>

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/">home</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/myblogs">my blogs</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/users">users</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>


        <Routes>
          <Route path="/myblogs" element={
            <div>
              <h4>users and number of blogs</h4>
              <ul>
                {blogs.filter(blog => blog.user.id === person.id)
                  .map((bl, i) =>
                    <div key={i}>
                      <Link to={`/myblogs/${bl.id}`}><Myblogs title={bl.title}/></Link>
                    </div>
                  )}
              </ul>
            </div>
          } />
          <Route path="/myblogs/:id" element={<Note blogs={blogs} />} />
          <Route path="/users" element={
            <div>
              <h4>users and number of blogs</h4>
              <ul>
                {persons.map((pers, i) =>
                  <div key={i}>
                    <Link to={`/users/${pers.id}`}><Users username={pers.username} blogslength={pers.blogs.length}/></Link>
                  </div>
                )}
              </ul>
            </div>
          } />
          <Route path="/users/:id" element={<Guy blogs={blogs} />} />
          <Route path="/blogs/:id" element={<Indiv blogs={blogs} hideWhenVisible={hideWhenVisible}
            showWhenVisible={showWhenVisible}
            toggleVisibility={toggleVisibility}
            note1Ref={note1Ref}
            updateLikes={updateLikes}
            updateComments={updateComments}
            addComment={addComment}
          />} />
          <Route path="/" element={
            <div>
              <Home person={person.name}
                blogFormRef={blogFormRef}
                addBlog={addBlog}
              />
              <h4>List of blogs</h4>
              <Table striped>
                <tbody>
                  {blogs.map((bl, i) =>
                    <tr key={i}>
                      <Link to={`/blogs/${bl.id}`}><Myblogs title={bl.title}/></Link>
                    </tr>
                  )}
                </tbody>
                <Myblogs blogs={blogs}/>
              </Table>
            </div>
          } />
        </Routes>
      </Router>}
      <Notification message={ message } />

      {!person && loginForm()}
      {person && <button onClick={handleLogoutClick}>logout</button>}
    </div>
  )

}

export default App