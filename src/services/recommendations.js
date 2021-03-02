import axios from 'axios'
const baseUrl = 'http://localhost:3001/recommendations'

const getAll = (url = baseUrl) => {
  return axios.get(url)
}
const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`)
}

export default {
  getAll: getAll,
  create: create,
  update: update
}