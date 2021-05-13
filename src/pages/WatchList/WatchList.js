import { useEffect, useState } from 'react'
import usersRouter from '../../services/users'
import recommendationsRouter from '../../services/recommendations'

import { Card, Row, Col, Typography, Switch } from 'antd'
import 'antd/lib/switch/style/css'
import 'antd/lib/card/style/css'
import 'antd/lib/row/style/css'
import 'antd/lib/col/style/css'
import 'antd/lib/table/style/css'
import 'antd/lib/switch/style/css'
import { CloseCircleTwoTone, EyeTwoTone } from '@ant-design/icons';
const { Meta } = Card;
const { Title } = Typography

const WatchList = (props) => {
  // console.log(props);
  const { user } = props
  const [watchlist, setWatchlist] = useState(null)
  const [filteredWatchlist, setFilteredWatchlist] = useState(null)
  const [watched, setWatched] = useState(null)
  const [filterMedia, setFilterMedia] = useState(false)

  useEffect(() => {
    if(user) {
      usersRouter.getWatchlist(user.id)
      .then(response => {
        setWatched(response.watched)
        setWatchlist(response.watchlist)
      })
    }
  },[user])

  if(watchlist && watched) {
    console.log(watchlist);
    console.log(watched);
    // console.log(watchlist.filter(w => watched.includes(w.toWatch.id)))
    console.log(filteredWatchlist);
  }

  const hideWatched = () => {
    // if(!filterMedia) {
    //   setFilteredWatchlist(watchlist.filter(w => watched.includes(w.toWatch.id)))
    // } 
    setFilterMedia(!filterMedia)
  }

  const removeFromWatchlist = async (mediaId) => {
    const watchlistId = watchlist.find(w => w.toWatch.id === mediaId)
    await usersRouter.removeFromWatchlist(user.id, watchlistId._id)
    setWatchlist(watchlist.filter(w => w._id !== watchlistId._id))
  }

  const toggleWatched = async (mediaId) => {
    if(!watched.includes(mediaId)) {
      const watchedObject = {
        userId: user.id,
        addToWatched: mediaId
      }
      await recommendationsRouter.markAsWatched(mediaId, watchedObject)

      setWatched([...watched, mediaId])
    } else {
      await recommendationsRouter.removeWatched(mediaId)
      setWatched(watched.filter(w => w !== mediaId))
    }
  }

  if(!watchlist) {
    return <div>loading..</div>
  }

    return(
      <>
        <Title>{user.username} - Watchlist</Title>
        <Switch onClick={hideWatched} /> {filterMedia ? "Watched items hidden" : "Watched items included"}
        <Row gutter={[48, 48]} type="flex">
        {watchlist.map(rec => 
        <Col 
        span={8} 
        key={rec.toWatch.id}
        style={{display: filterMedia && watched.includes(rec.toWatch.id) ? "none" :  'flex'}}
        >
          <Card

            style={{ width: 350, height: "100%", flexDirection: "column", display: 'flex'}}
            bodyStyle={{marginTop: "auto"}}
            cover={
              <img
                alt={rec.toWatch.Title}
                src={rec.toWatch.Poster}
                />
          }
          actions={[
            <EyeTwoTone onClick={() => toggleWatched(rec.toWatch.id)} twoToneColor={watched.includes(rec.toWatch.id) ? "#52c41a" : "#00000073"} key="mark as seen" />,
            <CloseCircleTwoTone onClick={() => removeFromWatchlist(rec.toWatch.id)} twoToneColor="#52c41a" key="Remove from watchlist" />,
            // <EllipsisOutlined key="ellipsis" />,
          ]}
          hoverable>
            <Meta title={rec.toWatch.Title} description={rec.toWatch.Director, rec.toWatch.Genre} />
          </Card> 
        </Col>
        )}
      </Row>
    </>
    )
}

export default WatchList