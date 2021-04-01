/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/recommendations'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = (url = baseUrl) => {
  return axios.get(url)
}

const create = newObject => {
  const config = {
    headers: { Authorization: token },
  }
  return axios.post(baseUrl, newObject, config)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const vote = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}/rottengas`, newObject)
  return request.then(response => response.data)
}

const voteUpdate = (id, voteID, newObject) => {
  const request = axios.put(`${baseUrl}/${id}/rottengas/${voteID}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, vote, voteUpdate, setToken }