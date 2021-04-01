import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/omdb'

const getSearch = (searchQuery) => {
  console.log(searchQuery);
  const url = `${baseUrl}/${searchQuery}`
  return axios.get(url)
}

export default { getSearch: getSearch }