import { useEffect, useState } from 'react'
import { searchColumns } from '../../../config/dataSources'
import OMDbService from '../../../services/omdb'
import SelectedMedia from './SelectedMedia'

import Table from 'antd/lib/table'
import Drawer from 'antd/lib/drawer'

import 'antd/lib/table/style/css'
import 'antd/lib/drawer/style/css'

const SearchResults = ({ searchResults, recommendations, setRecommendations }) => {
    const [clickedMedia, setClickedMedia] = useState(null)
    const [clickedMediaInfo, setClickedMediaInfo] = useState("")
    const [visibility, setVisibility] = useState(false)

    // If search result on table is clicked return more details about media.

    useEffect(() => {
      if(clickedMedia) {
        OMDbService.getSearch(`&i=${clickedMedia.imdbID}&plot=full`)
        .then(response => setClickedMediaInfo(response.data))
      }
    }, [clickedMedia])

    const clickedRow = (event, record) => {
      event.preventDefault()
      setClickedMedia(record)
      setVisibility(true)
    }
    const onClose = () => {
      setVisibility(false)
      setClickedMedia(null)
    }
    return(
      <>
        <Table 
          dataSource={searchResults} 
          columns={searchColumns} 
          rowKey={result => result.imdbID} 
          rowClassName = 'results-row'
          onRow={(record) => {
            return {
              onClick: event => {clickedRow(event, record)}
          }}} 
        />
        <Drawer 
          width="70%" 
          placement="right"
          onClose={onClose}
          visible={visibility}>
            {clickedMediaInfo && 
            <SelectedMedia 
              clickedMediaInfo={clickedMediaInfo} 
              setRecommendations={setRecommendations} 
              recommendations={recommendations} />}
        </Drawer>
      </>
    )
  }

export default SearchResults