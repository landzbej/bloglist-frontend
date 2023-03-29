import axios from 'axios'
const baseUrl = '/api/users'

export const getUser = async (username) => {
  let users = await axios.get(baseUrl)
  let user = users.data.find(user => user.username === username)
  return user
}
