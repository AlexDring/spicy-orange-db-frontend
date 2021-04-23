import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

const getUser = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const addToWatchlist = (id, newObject) => {
  const request = axios.post(`${baseUrl}/${id}/watchlist`, newObject)
  return request.then(response => response.data)
}

const removeFromWatchlist = (id, watchlistId) => {
  axios.delete(`${baseUrl}/${id}/watchlist/${watchlistId}`)
}

export default { getUser, addToWatchlist, removeFromWatchlist }