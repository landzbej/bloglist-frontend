import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

//ABOVE

describe('Toggleable', () => {

  

  // beforeEach(() => {
  //   container = render()
  // })

test('renders content', () => {
  const note = {
    title: 'Component testing is done with react-testing-library',
    author: 'me',
    url: 'here',
    likes: 0,
    user: 'me'
  }

  let container = render(<Blog title={note.title} author={note.author} url={note.url} likes={note.likes} user={note.user} />).container

  const shortElement = container.querySelector('.shortInfo')
  expect(shortElement).not.toHaveStyle('display: none')

  const longElement = container.querySelector('.longInfo')
  expect(longElement).toHaveStyle('display: none')
})

test.only('details button works', async () => {
  const note = {
    title: 'Component testing is done with react-testing-library',
    author: 'me',
    url: 'here',
    likes: 0,
    user: 'me'
  }

  // const mockHandler = jest.fn()

  // let container1 = render(<Blog title={note.title} author={note.author} url={note.url} likes={note.likes} user={note.user} toggleVisibility={mockHandler}/>).container

  let container = render(<Blog title={note.title} author={note.author} url={note.url} likes={note.likes} user={note.user}/>).container

  
  const user = userEvent.setup()

  // const button1 = container1.querySelector('.viewButton')
  // // screen.debug(button);

  // await user.click(button1)

  

  const button = container.querySelector('.viewButton')

  await user.click(button)


  const longElement = container.querySelector('.longInfo')
    expect(longElement).not.toHaveStyle('display: none')

  const shortElement = container.querySelector('.shortInfo')
    expect(shortElement).toHaveStyle('display: none')
})






test.only('<Blog />  like button registers event each time clicked', async () => {
  const note = {
    title: 'Component testing is done with react-testing-library',
    author: 'me',
    url: 'here',
    likes: 0,
    user: 'me'
  }
  //ADDED
  const updateLikes = jest.fn()
  //ABOVE
  const user = userEvent.setup()

  //ADDED handlelikes BELOW
  render(<Blog title={note.title} author={note.author} url={note.url} likes={note.likes} user={note.user} updateLikes={updateLikes}/>)

  const button = screen.getByText('like')
  // const sendButton = screen.getByText('save')

  // await user.type(input, 'testing a form...')
  await user.click(button)
  await user.click(button)

  expect(updateLikes.mock.calls).toHaveLength(2)
  // expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})





test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const addBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm addBlog={addBlog} />)

  const input = screen.getByPlaceholderText('title')
  const sendButton = screen.getByText('save')

  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('testing a form...')
})

})