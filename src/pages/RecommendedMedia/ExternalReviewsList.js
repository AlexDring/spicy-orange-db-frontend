import ExternalReviews from './ExternalReviews'
import { Col } from 'antd'

const ExternalReviewsList = ({ externalRatings }) => {
  return(
    <>
    {externalRatings.map(rating =>
      <Col key={rating.Source} span={8}>
        <ExternalReviews source={rating.Source} rating={rating.Value} />
      </Col>)}
    </>
  )
}

export default ExternalReviewsList