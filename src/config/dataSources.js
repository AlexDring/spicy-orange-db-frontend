import { Link } from 'react-router-dom'
import { Typography } from 'antd'
const { Text } = Typography

export const recommendationColumn = [
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
    render: (title, record) => 
    (<><Link to={`/recommendations/${record.id}`}>{title}</Link>
    <br />
    <Text type="secondary">{record.Year}, {record.Runtime}</Text></>)
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
    title: 'Type',
    dataIndex: 'Type',
    key: 'Type',
    render: Type => {
      if (Type === 'movie') {
        return 'Film'
      } else if (Type ==='series') {
        return 'TV'
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
    defaultSortOrder: "descend",
    render: dateAdded => new Date(dateAdded)
    .toLocaleDateString('en-gb', { year:"2-digit",month:"2-digit", day:"2-digit" })
  }
];

export const searchColumns = [
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

export const watchListColumns = [
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