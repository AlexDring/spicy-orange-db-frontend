import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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
import Tooltip from 'antd/lib/tooltip'

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
import 'antd/lib/tooltip/style/css'

import {
  HeartOutlined
} from '@ant-design/icons'

const { Title, Text } = Typography;

const RecommendedMedia = (props) => {
  const { recommendations, setRecommendations } = props
  const [modalVisibility, setModalVisibility] = useState(false)
  const [rottenGasVote, setRottenGasVote] = useState()
  const id = useParams().id

  if(!recommendations) {
    return <div>Loading...</div>
  }
  const recommendedMedia = recommendations.find(m => m.id === Number(id))

  console.log('id', id);
  console.log('recommendedMedia', recommendedMedia)

  const showModal = () => {
    setModalVisibility(true)
  }

  const handleCancel = () => {
    setModalVisibility(false)
  }

  console.log('rottenGasVote', rottenGasVote);

  const handleOk = () => {
    console.log(rottenGasVote);
    const recommendationObject = {
      ...recommendedMedia,
      rottenGas: [...recommendedMedia.rottenGas, 
        {
          user: null,
          score: rottenGasVote
        }
      ]
    }
    console.log(recommendationObject)

    axios.put(`http://localhost:3001/recommendations/${recommendedMedia.id}`, recommendationObject)
    .then(response => {
      setRecommendations(recommendations.map(r => r.id !== Number(id) ? r : response.data))
    })
    setModalVisibility(false)

  }
  console.log(recommendedMedia.rottenGas)

  let score = recommendedMedia.rottenGas.reduce((a, c) => a + c.score, 0) / recommendedMedia.rottenGas.length
  let imdbJoe = (new Date().getFullYear() - recommendedMedia.Year)/10 

  console.log(imdbJoe);
  return(
    <>
      <Breadcrumb>
        <BreadcrumbItem><Link to="/recommendations">Recommendations</Link></BreadcrumbItem>
        <BreadcrumbItem><a href="#">Film</a></BreadcrumbItem>
        <BreadcrumbItem>{recommendedMedia.Title}</BreadcrumbItem>
      </Breadcrumb>

      <Row style={{marginTop: 30}} gutter={[16, 16]}>
        <Col span={8}>
          <Image style={{paddingBottom: 30}} src={recommendedMedia.Poster} />
        </Col>
        <Col span={16}>
          <Title style={{display: "inline-block", marginRight: 15}} level={1}>{recommendedMedia.Title}</Title><Text type="secondary">{recommendedMedia.Year}</Text>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card  title={`Rotten Ga's - ${recommendedMedia.rottenGas.length} Votes`} hoverable>
                <Statistic value={Math.round(score)} suffix={`/1000`} />
              </Card>
            </Col>
            <Col span={8}>
              <Card  title={'Your Rating'} onClick={showModal} hoverable>
                <Statistic value={recommendedMedia.rottenGas.score} suffix={`/1000`} />
              </Card>
            </Col>
            {recommendedMedia.Type !== 'series' && <Col span={8}>
            <Tooltip title="According to Joe a film should lose an IMDB point for each decade since its release.">
              <Card  title={'Joe\'s IMDB Rating'}>
                <Statistic value={recommendedMedia.imdbRating - imdbJoe} suffix={`/10`} />
              </Card>
            </Tooltip>
            </Col>}
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
              defaultValue={recommendedMedia.rottenGas.score ? recommendedMedia.rottenGas.score : 500} max={1000} 
              getTooltipPopupContainer={() => document.querySelector(".ant-slider-step")} 
              tooltipVisible
            />
          </Modal>


          <Row style={{marginTop: 30}} gutter={[16, 16]}>
            {recommendedMedia.Ratings.map(rating =>
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
            <Descriptions.Item label="Director">{recommendedMedia.Director}</Descriptions.Item>
            <Descriptions.Item label="Writer">{recommendedMedia.Writer}</Descriptions.Item>
            <Descriptions.Item label="Runtime">{recommendedMedia.Runtime}</Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={24}><Text>Production: {recommendedMedia.Production}</Text></Col>
        {recommendedMedia.Awards !== "N/A" && <Col span={24}><Text>{recommendedMedia.Awards}</Text></Col>}
        <Col span={24}><Text>{recommendedMedia.Plot}</Text></Col>
      </Row>
    </>
  )
 }

export default RecommendedMedia