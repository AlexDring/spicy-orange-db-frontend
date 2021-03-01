import { useEffect, useState } from 'react'
import axios from 'axios'
import SelectedMedia from './SelectedMedia'
import Table from 'antd/lib/table'
import Drawer from 'antd/lib/drawer'
import 'antd/lib/table/style/css'
import 'antd/lib/drawer/style/css'

const SearchResults = ({ results }) => {
    const [selected, setSelected] = useState(null)
    const [selectedMedia, setSelectedMedia] = useState("")
    const [visibility, setVisibility] = useState(false)

    useEffect(() => {
      if(!selected) {
        return
      }
      async function fetchData() {
        const clickedRow = await axios.get(`http://www.omdbapi.com/?apikey=dd31d048&i=${selected.imdbID}&plot=full`)
        setSelectedMedia(clickedRow)
      }
      fetchData()
    }, [selected])

    const columns = [
      {
        title: '',
        dataIndex: 'Poster',
        key: 'Poster',
        render: Poster => 
          <img alt='Film poster' height={80} src={Poster === 'N/A' ? 'https://via.placeholder.com/56x80.jpeg?text=n/a' : Poster}></img>
      },
      {
        title: 'Title',
        dataIndex: 'Title',
        key: 'Title'
      },
      {
        title: 'Year',
        dataIndex: 'Year',
        key: 'Year',
      },
      {
        title: 'Type',
        dataIndex: 'Type',
        key: 'Type',
        render: Type => {
          if (Type === 'movie') {
            return 'Film'
          } else if (Type ==='series') {
            return 'TV Show'
          } else {
            return Type
          }
        }
      }, 
    ];

    const showSelected = (event, record) => {
      event.preventDefault()
      setSelected(record)
      setVisibility(true)
    }
    const onClose = () => {
      setVisibility(false)
      setSelected(null)
    }
    return(
      <>
        <Table 
          dataSource={results} 
          columns={columns} 
          rowKey={result => result.imdbID} 
          rowClassName = 'results-row'
          onRow={(record) => {
            return {
              onClick: event => {showSelected(event, record)}
            }
          }
          } 
        />
        <Drawer 
          width="70%" 
          placement="right"
          onClose={onClose}
          visible={visibility}
        >
          {selectedMedia && <SelectedMedia selectedMedia={selectedMedia} /> }
        </Drawer>
      </>
    )
  }

export default SearchResults