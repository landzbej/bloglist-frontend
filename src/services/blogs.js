
import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data.sort((a,b) => b.likes - a.likes))
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const erase = async (id) => {
  await axios.delete(`${ baseUrl }/${id}`)
}

const update = async (id, blogObject) => {
  const blogs = await axios.get(baseUrl)

  const data = blogs.data
  console.log('blogServices 64', blogObject)
  const response = await axios.put(`${ baseUrl }/${id}`, blogObject)

  return data.map(n => n.user.id !== id ? n : response.data)


}


export default { getAll, create, update, setToken, erase }
