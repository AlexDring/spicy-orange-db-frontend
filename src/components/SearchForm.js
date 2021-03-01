 
const SearchForm = () => {
    return(
    <form onSubmit={mediaSubmit}>
        <input 
        type="text"
        placeholder="search for a film/tv show"
        onChange={({ target }) => setMedia(target.value)}
        />
        <button type="submit">search</button>
    </form>
    )
}

export default SearchForm 