import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Breadcrumb from 'antd/lib/breadcrumb'
import BreadcrumbItem from 'antd/lib/breadcrumb/BreadcrumbItem'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import Image from 'antd/lib/image'
import Typography from 'antd/lib/typography'
import Descriptions from 'antd/lib/descriptions'
import Statistic from 'antd/lib/statistic'
import Slider from 'antd/lib/slider';
import Modal from 'antd/lib/modal'
import Card from 'antd/lib/card'

import 'antd/lib/row/style/css'
import 'antd/lib/image/style/css'
import 'antd/lib/col/style/css'
import 'antd/lib/breadcrumb/style/css';
import 'antd/lib/typography/style/css';
import 'antd/lib/descriptions/style/css'
import 'antd/lib/statistic/style/css'
import 'antd/lib/slider/style/css'
import 'antd/lib/modal/style/css'
import 'antd/lib/card/style/css'

import {
  HeartOutlined
} from '@ant-design/icons'

const { Title, Text } = Typography;

const RecommendedMedia = (props) => {
  console.log(props)
  const { clickedRecommendation } = props
  
  const [modalVisibility, setModalVisibility] = useState(false)
  const [rottenGasVote, setRottenGasVote] = useState()
  const showModal = () => {
    setModalVisibility(true)
  }

  const handleCancel = () => {
    setModalVisibility(false)
  }

  const onChange = (value) => {
    setRottenGasVote(value)
  }

  console.log('rottenGasVote', rottenGasVote);
  const handleOk = () => {
    console.log(rottenGasVote);
    const recommendationObject = {
      ...clickedRecommendation,
      rottenGas: [...clickedRecommendation.rottenGas, 
        {
          user: null,
          score: rottenGasVote
        }
      ]
    }
    console.log(recommendationObject)
    axios.put(`http://localhost:3001/recommendations/${clickedRecommendation.id}`, recommendationObject)
    .then(response => 
      console.log(response.data))
      setModalVisibility(false)
  }

  if(!clickedRecommendation) {
    return <div>Loading...</div>
  }

 clickedRecommendation.rottenGas.reduce((a, c) => {
  console.log(a, c.score);
  return a + c.score
 }, 0)

  return(
    <>
      <Breadcrumb>
        <BreadcrumbItem><Link to="/recommendations">Recommendations</Link></BreadcrumbItem>
        <BreadcrumbItem><a href="#">Film</a></BreadcrumbItem>
        <BreadcrumbItem>{clickedRecommendation.Title}</BreadcrumbItem>
      </Breadcrumb>

      <Row className="site-layout-background"  style={{marginTop: 30}} gutter={[16, 16]}>
        <Col span={8}>
        <Image
          src={clickedRecommendation.Poster}
        />
        </Col>
        <Col span={16}>
          <Title level={1}>{clickedRecommendation.Title}</Title>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card  title={'Rotten Ga\'s'}>
                <Statistic value={clickedRecommendation.rottenGas.reduce((a, c) => a + c.score, 0)/ clickedRecommendation.rottenGas.length} suffix={`/1000`} />
              </Card>
            </Col>
            <Col span={8}>
              <Card  title={'Your Rating'} onClick={showModal}>
                <Statistic value={clickedRecommendation.rottenGas.score} suffix={`/1000`} />
              </Card>
            </Col>
          </Row>
          <Modal
            title="HOW MANY ROTTEN GAS?"
            visible={modalVisibility}
            onOk={handleOk}
            // confirmLoading={confirmLoading}
            onCancel={handleCancel}
          > 
            <HeartOutlined />
            <Slider 
              onChange={(value) => setRottenGasVote(value)}
              defaultValue={clickedRecommendation.rottenGas.score ? clickedRecommendation.rottenGas.score : 500} max={1000} 
              getTooltipPopupContainer={() => document.querySelector(".ant-slider-step")} 
              tooltipVisible
            />
          </Modal>


          <Row style={{marginTop: 30}} gutter={[16, 16]}>
            {clickedRecommendation.Ratings.map(rating =>
              <Col key={rating.Source} span={8}>
                <Card title={rating.Source}>
                  <Statistic value={rating.Value} />
                </Card>
              </Col>
              )}
          </Row>          
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
        <Descriptions layout="vertical" bordered>
            <Descriptions.Item label="Director">{clickedRecommendation.Director}</Descriptions.Item>
            <Descriptions.Item label="Writer">{clickedRecommendation.Writer}</Descriptions.Item>
            <Descriptions.Item label="Runtime">{clickedRecommendation.Runtime}</Descriptions.Item>
          </Descriptions>
        </Col>
        {clickedRecommendation.Awards !== "N/A" && <Col span={24}><Text>{clickedRecommendation.Awards}</Text></Col>}
        <Col span={24}><Text>{clickedRecommendation.Plot}</Text></Col>
      </Row>
    </>
  )
 }

export default RecommendedMedia