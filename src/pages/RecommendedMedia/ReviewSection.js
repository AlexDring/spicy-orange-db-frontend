import { useState } from 'react'

import recommendationsService from '../../services/recommendations'

import RottenReviews from './RottenReviews'
import ExternalReviews from './ExternalReviews'
import ExternalReviewsList from './ExternalReviewsList'

import certified from '../../assets/images/Certified.png'
import fresh from '../../assets/images/fresh.png'
import stinker from '../../assets/images/stinker.png'

import { Col, Row, Tooltip, Modal, Slider, Input, Button } from 'antd'
import 'antd/lib/col/style/css'
import 'antd/lib/row/style/css'
import 'antd/lib/tooltip/style/css'
import 'antd/lib/modal/style/css'
import 'antd/lib/slider/style/css'
import 'antd/lib/input/style/css'
import 'antd/lib/button/style/css'

const { TextArea } = Input

const ReviewSection = props => {
  const { recommendedMedia, recommendations, setRecommendations, externalRatings, rottenRatings, user } = props
  const [modalVisibility, setModalVisibility] = useState(false)
  const [rottenScore, setRottenScore] = useState()
  const [rottenReview, setRottenReview] = useState()

  console.log('recommendedMedia', recommendedMedia);
  let userRating = rottenRatings.find(r => r.user === user.username)
  console.log(userRating)

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

    const handleOk = async () => {
      const recommendationObject = { user: user.username, score: rottenScore, review: rottenReview } 
      // let userVote = recommendedMedia.rottenGas.find(rec => rec.user === recommendationObject.user)
  
      if(userRating) {
        const updatedVote = await recommendationsService.voteUpdate(recommendedMedia.id, userRating._id, recommendationObject)
        setRecommendations(recommendations.map(r => r.id === recommendedMedia.id ? updatedVote : r))
      } else {
        const vote = await recommendationsService.vote(recommendedMedia.id, recommendationObject)
        setRecommendations(recommendations.map(r => r.id !== recommendedMedia.id ? r : vote))
      }
      setModalVisibility(false)
    }
  
    const handleCancel = () => {
      setModalVisibility(false)
    }

    const handleDeleteRating = async () => {
      await recommendationsService.deleteRating(recommendedMedia.id, userRating._id)
      setRecommendations(recommendations.map(r => {
        if (r.id !== recommendedMedia.id ) {
          return r
        }
        const newRottenGas = r.rottenGas.filter(v => v._id !== userRating._id)
        r.rottenGas = newRottenGas
        return r
      }))
      
      setModalVisibility(false)
    }
  
  const showModal = () => {
    setModalVisibility(true)
  }

  return(
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <a href="#">
            <RottenReviews 
              title={`${rottenRatings.length} Vote${rottenRatings.length > 1 ? 's' : ''}`}
              score={(rottenRatings.reduce((a, c) => a + c.score, 0)/rottenRatings.length)} 
              rottenScores={rottenScores} 
            />
          </a>
        </Col>
        <Col span={8}>
          <a href="#" onClick={showModal}>
            <RottenReviews
              title={"Your Rating"}
              score={userRating ? userRating.score : null} 
              rottenScores={rottenScores} 
            />
          </a>
        </Col>
        {recommendedMedia.Type !== 'series' && 
        <Col span={8}>
          <Tooltip title="Joe reckons a film should lose an IMDB point for each decade since its release.">
            <ExternalReviews
              source={'JoeImdb'}
              rating={(recommendedMedia.imdbRating - 
              (new Date().getFullYear() - recommendedMedia.Year)/10)
              .toFixed(2).concat('/10')} 
            />
          </Tooltip>
        </Col>}
      </Row>
      <Modal
        title="How many Rotten Ga's"
        visible={modalVisibility}
        // onOk={handleOk}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[ 
        userRating && <Button type="link" onClick={handleDeleteRating}>
          Delete rating
        </Button>, 
        <Button key="back" onClick={handleCancel}>
          Return
        </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
          Submit
        </Button>
        ]} > 

          {rottenScore && <img height={150} src={rottenIcons(rottenScore)} alt=""/>}
          {rottenScores(rottenScore)}
          <Slider 
            onChange={(value) => setRottenScore(value)}
            defaultValue={userRating ? userRating.score : false} max={1000} 
            getTooltipPopupContainer={() => document.querySelector(".ant-slider-step")} 
            tooltipVisible
          />
          <TextArea 
        defaultValue={userRating ? userRating.review : null} 
        onChange={({ target }) => setRottenReview(target.value)} 
        rows={4} 
          />

      </Modal>
      <Row style={{marginTop: 30}} gutter={[16, 16]}>
        <ExternalReviewsList externalRatings={externalRatings} /> 
      </Row>          
    </>
  )
}

export default ReviewSection