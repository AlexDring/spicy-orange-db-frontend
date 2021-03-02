import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Table from 'antd/lib/table'
import 'antd/lib/table/style/css'

const Recommendations = ({ recommendations, setRecommendations, setClickedRecommendation }) => {

  const recommended = (e, record) => {
    e.preventDefault()
    setClickedRecommendation(record)
  }

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
      key: 'Title',
      render: (title, record) => <Link to={`/recommendations/${record.id}`}>{title}</Link>
    },
    {
      title: 'Director',
      dataIndex: 'Director'
    },
    {
      title: 'Genres',
      dataIndex: 'Genre'
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
    {
      title: 'IMDB',
      dataIndex: 'imdbRating'
    },
    {
      title: 'Meta Critic',
      dataIndex: 'Metascore'
    },
    {
      title: "Date Added",
      dataIndex: "dateAdded",
      sorter: (a, b) => new Date(a.dateAdded) - new Date(b.dateAdded),
      defaultSortOrder: "descend"
    }
  ];

  return(
    <Table 
    dataSource={recommendations} 
    columns={columns} 
    rowKey={result => result.id} 
    rowClassName = 'results-row'
    onRow={(record) => {
      return {
        onClick: event => { recommended(event, record) }
      }
    }}
    />
  )
}

export default Recommendations