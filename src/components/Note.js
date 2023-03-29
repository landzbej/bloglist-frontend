import {
  useParams
} from 'react-router-dom'

const Note = ({ blogs }) => {
  const id = useParams().id
  console.log('id', id)
  console.log('blogs', blogs)
  const note = blogs.find(n => n.id === id)
  console.log('note', note)
  return (
    <div>
      <h2>{note.title}</h2>
      <div>{note.author}</div>
      <div><strong>{note.likes}</strong></div>
    </div>
  )
}

export default Note