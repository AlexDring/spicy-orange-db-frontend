import { useState } from 'react'
import Input from 'antd/lib/input'
import 'antd/lib/input/style/css';
 
const { Search } = Input

const SearchForm = ({ setSearchQuery }) => {
  const [media, setMedia] = useState("")

  const mediaSubmit = (e) => {
    e.preventDefault()
    setSearchQuery(media)
    setMedia("")
  }

  return(
    <form onSubmit={mediaSubmit}>
      <Search
        placeholder="Search for a film or tv show"
        enterButton="Search"
        size="large"
        style={{ width: 400 }}
        onChange={({ target }) => setMedia(target.value)}
        onSubmit={mediaSubmit} 
      />
    </form>
  )
}


export default SearchForm 