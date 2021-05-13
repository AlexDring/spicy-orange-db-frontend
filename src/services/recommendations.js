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
  console.log(config)
  return axios.post(baseUrl, newObject, config)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const vote = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}/rottengas`, newObject)
  return request.then(response => response.data)
}

const voteUpdate = (id, voteId, newObject) => {
  const request = axios.put(`${baseUrl}/${id}/rottengas/${voteId}`, newObject)
  return request.then(response => response.data)
}

const deleteRating = (id, voteId) => {
  const request = axios.delete(`${baseUrl}/${id}/rottengas/${voteId}`)
  return request.then(response => response.data)
}

const markAsWatched = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.post(`${baseUrl}/${id}/watched`, newObject, config)
  return request.then(response => response.data)
}

const removeWatched = (id) => {
  const config = {
    headers: { Authorization: token },
  }
 axios.delete(`${baseUrl}/${id}/remove-watched`, config)
}

export default { getAll, create, update, vote, voteUpdate, setToken, markAsWatched, removeWatched, deleteRating }