import axios from 'axios'
const baseUrl = '/api/users'

export const getUsers = async () => {
  let users = await axios.get(baseUrl)
  console.log('users', users)
  return users.data.sort((a,b) => a.name - b.name)
}