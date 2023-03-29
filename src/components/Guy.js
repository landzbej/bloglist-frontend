import {
  useParams
} from 'react-router-dom'

const Guy = ({ blogs }) => {
  const id = useParams().id
  console.log('id', id)
  console.log('blogs', blogs)
  const noteArr = blogs.filter(n => n.user.id === id)
  console.log('noteArr', noteArr)
  return (
    noteArr.map((note, i) =>
      <div key={i}>
        <h2>{note.title}</h2>
        <div><strong>{note.likes}</strong></div>
      </div>
    )
  )
}

export default Guy