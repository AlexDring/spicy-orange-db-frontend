import { useEffect, useState } from 'react'
import OMDbService from '../../services/omdb'
import SearchForm from './components/SearchForm'
import SearchResults from './components/SearchResults'

const AddRecommendation = (props) => {
  const { recommendations, setRecommendations } = props 
  const [searchResults, setSearchResults] = useState(null)
  const [searchQuery, setSearchQuery ] = useState("")
  
  // return results for search query
  useEffect(() => { 
      if(searchQuery) {
        OMDbService.getSearch(`&s=${searchQuery}`)
        .then(response => setSearchResults(response.data.Search))
      }
  }, [searchQuery])
  
  return(
    <>
      <SearchForm setSearchQuery={setSearchQuery} setSearchResults={setSearchResults} />
      {searchResults && 
      <SearchResults 
        searchResults={searchResults} 
        setRecommendations={setRecommendations} 
        recommendations={recommendations} />
      }
    </>
  )
}

export default AddRecommendation