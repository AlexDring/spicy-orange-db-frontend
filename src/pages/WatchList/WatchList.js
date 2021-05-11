import { useEffect, useState } from 'react'
import usersRouter from '../../services/users'

import { Card, Row, Col, Typography } from 'antd'
import 'antd/lib/switch/style/css'
import 'antd/lib/card/style/css'
import 'antd/lib/row/style/css'
import 'antd/lib/col/style/css'
import 'antd/lib/table/style/css'
import { EditOutlined, EllipsisOutlined, CloseCircleTwoTone, EyeOutlined } from '@ant-design/icons';
const { Meta } = Card;
const { Title } = Typography

const WatchList = (props) => {
  console.log(props);
  const { user } = props
  const [watchlist, setWatchlist] = useState(null)
  
  useEffect(() => {
    if(user) {
      usersRouter.getWatchlist(user.id)
      .then(response => setWatchlist(response.watchlist))
    }
  },[user])

  if(!watchlist) {
    return <div>loading..</div>
  }

    return(
      <>
        <Title>{user.username} - Watchlist</Title>
        <Row gutter={[48, 48]} type="flex">
        {watchlist.map(rec => 
        <Col span={8} key={rec.toWatch.id}>
          <Card
          style={{ width: 350, height: "100%", display: 'flex', flexDirection: "column" }}
          bodyStyle={{marginTop: "auto"}}
          cover={
            <img
              alt={rec.toWatch.Title}
              src={rec.toWatch.Poster}
              />
          }
          actions={[
            <EyeOutlined twoToneColor="#00000073" key="mark as seen" />,
            <CloseCircleTwoTone twoToneColor="#52c41a" key="Remove from watchlist" />,
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