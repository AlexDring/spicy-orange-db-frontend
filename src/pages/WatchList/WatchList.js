import { useState } from 'react'
import { watchListColumns } from '../../config/dataSources'

import Switch from 'antd/lib/switch'
import Card from 'antd/lib/card'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Table from 'antd/lib/table'

import { EditOutlined, EllipsisOutlined, EyeOutlined } from '@ant-design/icons';
import 'antd/lib/switch/style/css'
import 'antd/lib/card/style/css'
import 'antd/lib/row/style/css'
import 'antd/lib/col/style/css'
import 'antd/lib/table/style/css'

const { Meta } = Card;
const WatchList = ({ recommendations }) => {
  const [checked, setChecked] = useState(true)
  console.log(checked)

  const switchChange = () => {
    setChecked(!checked)
  }

  if(!recommendations) {
    return <div>loading..</div>
  }

  if(checked) {
    return(
      <>
      <Switch defaultChecked checkedChildren="Cards" unCheckedChildren="Table" onChange={switchChange} />
      <Row gutter={[16, 16]} type="flex">
      {recommendations.map(rec => 
      <Col span={6} key={rec.id}>
        <Card
        style={{ width: 250, height: "100%", display: 'flex', flexDirection: "column" }}
        bodyStyle={{marginTop: "auto"}}
        cover={
          <img
            alt={rec.Title}
            src={rec.Poster}
            />
        }
        actions={[
          <EyeOutlined key="mark as seen" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
        hoverable>

          <Meta title={rec.Title} description={rec.Genre} />
        </Card> 
      </Col>
      )}
    </Row>
    </>
    )
  }

  return(
    <>
      <Switch defaultChecked checkedChildren="Cards" unCheckedChildren="Table" onChange={switchChange} />
      <Table 
        dataSource={recommendations} 
        columns={watchListColumns} 
        rowKey={result => result.id} 
        rowClassName = 'results-row'
        />
    </>
  )
}

export default WatchList