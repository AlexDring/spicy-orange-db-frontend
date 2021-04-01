import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import recommendationsService from '../../services/recommendations'

import imdb from '../../assets/images/imdb.png'
import joeimdb2 from '../../assets/images/joeimdb2.png'
import rottentomatoes from '../../assets/images/rottentomatoes.png'
import metacritic from '../../assets/images/metacritic.png'
import certified from '../../assets/images/Certified.png'
import fresh from '../../assets/images/fresh.png'
import stinker from '../../assets/images/stinker.png'

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
import Switch from 'antd/lib/switch'

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
import 'antd/lib/switch/style/css'

import {
  HeartOutlined,
  EyeFilled,
  EyeInvisibleOutlined
} from '@ant-design/icons'

const { Title, Text } = Typography;

const RecommendedMedia = (props) => {
  const { user, recommendations, setRecommendations } = props
  const [modalVisibility, setModalVisibility] = useState(false)
  const [rottenGasVote, setRottenGasVote] = useState()
  const id = useParams().id

  if(!recommendations) {
    return <div>Loading...</div>
  }

  const recommendedMedia = recommendations.find(m => m.id === id)
  let userScore = recommendedMedia.rottenGas.find(s => s.user === user.username)
  
  console.log(userScore);
  
  const showModal = () => {
    setModalVisibility(true)
  }

  const handleCancel = () => {
    setModalVisibility(false)
  }
  const rottenScores = (rottenScore) => {
    return(
      rottenScore > 899 ? 'Straight up me chavvy'
      : rottenScore > 799 ? 'Suck on thum' 
      : rottenScore > 699 ? 'Prettty goood'
      : rottenScore > 599 ? 'Bang average'
      : rottenScore > 499 ? 'Oh'
      : rottenScore > 399 ? 'Oh no'
      : rottenScore > 299 ? 'Oh dear'
      : rottenScore > 199 ? 'Nooooo'
      : rottenScore < 199 ? 'Whyyyyyyy'
      : ''
    )
  }
  const rottenIcons = (rottenScore) => {
    return(
    rottenScore > 900 ? certified 
    : rottenScore < 500 ? stinker
    : fresh
    )
  }

  console.log(user, typeof user)
  const handleOk = async () => {    
    const recommendationObject = { user: user.username, score: rottenGasVote } 
    let userVote = recommendedMedia.rottenGas.find(rec => rec.user === recommendationObject.user)

    if(userVote) {
      const updatedVote = await recommendationsService.voteUpdate(recommendedMedia.id, userVote._id, recommendationObject)
      setRecommendations(recommendations.map(r => r.id === id ? updatedVote : r))
    } else {
      const vote = await recommendationsService.vote(recommendedMedia.id, recommendationObject)
      console.log(vote);
      setRecommendations(recommendations.map(r => r.id !== id ? r : vote))
    }
    setModalVisibility(false)
  }

  let score
  if(recommendedMedia.rottenGas.length !== 0) {
    score = recommendedMedia.rottenGas.reduce((a, c) => a + c.score, 0) / recommendedMedia.rottenGas.length
  }
  
  let imdbJoe = (new Date().getFullYear() - recommendedMedia.Year)/10 

  return(
    <>
      <Breadcrumb>
        <BreadcrumbItem><Link to="/recommendations">Recommendations</Link></BreadcrumbItem>
        <BreadcrumbItem><a href="#">Film</a></BreadcrumbItem>
        <BreadcrumbItem>{recommendedMedia.Title}</BreadcrumbItem>
      </Breadcrumb>

      <Row style={{marginTop: 30}} gutter={[16, 16]}>
        <Col style={{position: 'relative'}} span={8}>
          {score && 
          <img 
          width={score > 900 ? 100 : 150} 
          style={{position: 'absolute', top: -5, left: -30, zIndex: 1}} 
          src={rottenIcons(score)} 
            alt="" />}
          <Image style={{paddingBottom: 30}} src={recommendedMedia.Poster} />
        </Col>
        <Col span={16}>
          <Title style={{display: "inline-block", marginRight: 15}} level={1}>{recommendedMedia.Title}</Title>
          <Text type="secondary">{recommendedMedia.Year}</Text>
          {/* <Row>
            <Text>Watched:</Text>
            <Switch 
            checkedChildren={<EyeFilled />} 
            unCheckedChildren={<EyeInvisibleOutlined />} 
            defaultChecked={userScore ? true : false} />
            <Tooltip placement="topLeft" title="Seen Movie?">
              {userScore ? <EyeFilled style={{fontSize: "20px"}} /> : <EyeInvisibleOutlined style={{fontSize: "20px"}} />}
            </Tooltip>
          </Row> */}
          <Row gutter={[16, 16]}>
            <Col span={8}>
              {/* <Card  title={`Rotten Ga's - ${recommendedMedia.rottenGas.length} Votes`} hoverable>
                {score ? <Statistic value={Math.round(score)} suffix={`/1000`} /> : <Text>No Rating</Text>}
                {rottenScores(score)}
              </Card> */}
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <h3 style={{textTransform: 'uppercase', fontWeight: 900, marginBottom: 0}}>Rotten Ga's</h3>
                  <h4>
                    {`${recommendedMedia.rottenGas.length} Vote${recommendedMedia.rottenGas.length > 1 ? 's' : ''}`}
                  </h4>
                  <div style={{marginTop: 'auto', textAlign: 'center'}}>
                    {score ? <p style={{fontSize: 24, marginBlock: 5}}>{Math.round(score)}/1000</p> : 'No ratings'}
                    <p>{userScore && rottenScores(Math.round(score))}</p>
                  </div>
                </div>
            </Col>
            <Col span={8}>
              <a onClick={showModal}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h3 style={{textTransform: 'uppercase', fontWeight: 900, marginBottom: 0}}>Rotten Ga's</h3>
                  <h4>Your Rating</h4>
                  <div style={{marginTop: 'auto', textAlign: 'center'}}>
                    {userScore ? <p style={{fontSize: 24, marginBlock: 5}}>{
                    userScore.score}/1000</p> : 'Click to rate'}
                    <p>{userScore && rottenScores(userScore.score)}</p>
                  </div>
                </div>
              </a>
              {/* <Card  title={'Your Rating'} onClick={showModal} hoverable>
                {userScore ? <Statistic value={userScore.score} suffix={`/1000`} /> : <Text>No Rating</Text>}
                {userScore && rottenScores(userScore.score)}
              </Card> */}
            </Col>
            {recommendedMedia.Type !== 'series' && <Col span={8}>
            <Tooltip title="Joe reckons a film should lose an IMDB point for each decade since its release.">
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <img width={140} src={joeimdb2} alt=""/>
                <div style={{marginTop: 'auto'}}>
                  <p style={{fontSize: 24}}>{(recommendedMedia.imdbRating - imdbJoe).toFixed(2)}/10</p>
                </div>
              </div>
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
          
          {rottenGasVote && <img height={150} src={rottenIcons(rottenGasVote)} alt=""/>}
          {rottenScores(rottenGasVote)}
            <Slider 
              onChange={(value) => setRottenGasVote(value)}
              defaultValue={recommendedMedia.rottenGas.score ? recommendedMedia.rottenGas.score : 500} max={1000} 
              getTooltipPopupContainer={() => document.querySelector(".ant-slider-step")} 
              tooltipVisible
            />
          </Modal>
          {/* <Row style={{marginTop: 30}} gutter={[16, 16]}>
            {recommendedMedia.Ratings.map(rating =>
              <Col key={rating.Source} span={8}>
                <Card title={rating.Source}>
                  <Statistic value={rating.Value} />
                </Card>
              </Col>
              )}
          </Row>           */}
          <Row style={{marginTop: 30}} gutter={[16, 16]}>
            {recommendedMedia.Ratings.map(rating =>
              <Col key={rating.Source} span={8}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  {rating.Source === 'Internet Movie Database' && <img width={130} src={imdb} alt=""/>}
                  {rating.Source === 'Rotten Tomatoes' && <img width={130} src={rottentomatoes} alt=""/>}
                  {rating.Source === 'Metacritic' && <img width={130} src={metacritic} alt=""/>}
                  <div style={{marginTop: 'auto'}}>
                    <p style={{fontSize: 24}}>{rating.Value}</p>
                  </div>
                </div>
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
        <Col span={24}><Text>Actors: {recommendedMedia.Actors}</Text></Col>
        <Col span={24}><Text>{recommendedMedia.Plot}</Text></Col>
        {recommendedMedia.Production && <Col span={24}><Text>Production: {recommendedMedia.Production}</Text></Col>}
        {recommendedMedia.Awards !== "N/A" && <Col span={24}><Text>{recommendedMedia.Awards}</Text></Col>}
      </Row>
    </>
  )
 }

export default RecommendedMedia