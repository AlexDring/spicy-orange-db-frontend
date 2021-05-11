import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

const getUser = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const getWatchlist = (id) => {
  const request = axios.get(`${baseUrl}/${id}/watchlist`)
  return request.then(response => response.data)
}

const addToWatchlist = (id, newObject) => {
  const request = axios.post(`${baseUrl}/${id}/watchlist`, newObject)
  return request.then(response => response.data)
}

const removeFromWatchlist = (id, watchlistId) => {
  const request = axios.delete(`${baseUrl}/${id}/watchlist/${watchlistId}`)
  return request.then(response => response.data)
}

const markAsWatched = (id, watchlistId) => {
  const request = axios.post(`${baseUrl}/${id}/${watchlistId}/mark-as-watched`)
  return request.then(response => response.data)
}

export default { 
  getUser: getUser, 
  getWatchlist: getWatchlist, 
  addToWatchlist: addToWatchlist,
  removeFromWatchlist: removeFromWatchlist, 
  markAsWatched: markAsWatched 
}