import { Col, Row, Descriptions, Typography, Button } from 'antd';
import { useHistory } from 'react-router-dom'

import recommendationsService from '../../../services/recommendations'

import 'antd/lib/col/style/css'
import 'antd/lib/row/style/css'
import 'antd/lib/descriptions/style/css'
import 'antd/lib/row/style/css'

const { Title } = Typography;

const SelectedMedia = (props) => {
  const { clickedMediaInfo, setRecommendations, recommendations } = props
  let history = useHistory()

  // console.log(clickedMediaInfo);
  // console.log(recommendations);
  let alreadyAdded = recommendations.find(r => r.imdbID === clickedMediaInfo.imdbID)
  // console.log('alreadyAdded', alreadyAdded);

  const addRecommendation = (e) => {
    e.preventDefault()
    const recommendedMediaObject = {
      ...clickedMediaInfo,
      dateAdded: new Date(),
      rottenGas: []
    }
    recommendationsService.create(recommendedMediaObject)
    .then(response => {
      setRecommendations(recommendations.concat(response.data))
      history.push(`/recommendations/${response.data.id}`)
    }) 
  }

    return(
      <div>
        <Row>
          <Col span={10}>
            <img src={clickedMediaInfo.Poster} alt=""/>
          </Col>
          <Col span={14}>
            <Title level={1}>{clickedMediaInfo.Title}</Title>
            {alreadyAdded ? <Button onClick={addRecommendation}>Already Added!</Button> : <Button onClick={addRecommendation}>Add to Recommendations</Button>}
            <Descriptions style={{marginTop: 30}}>
              <Descriptions.Item label="Type">{clickedMediaInfo.Type}</Descriptions.Item>
              <Descriptions.Item label="Year">{clickedMediaInfo.Year}</Descriptions.Item>
              <Descriptions.Item label="Runtime">{clickedMediaInfo.Runtime}</Descriptions.Item>
            </Descriptions>
            <p>Genres: {clickedMediaInfo.Genre}</p>
            {clickedMediaInfo.Ratings.map(r => 
              <p key={r.Source}>{r.Source} <strong>{r.Value}</strong></p>
            )}
          </Col>
        </Row>
        <Row style={{marginTop: 30}}>
        <Col span={24}>
            <p>Director: {clickedMediaInfo.Director}</p>
            <p>Writer: {clickedMediaInfo.Writer}</p>
            <p>Actors: {clickedMediaInfo.Actors}</p>
            <p>Plot: {clickedMediaInfo.Plot}</p>
            {clickedMediaInfo.Awards !== 'N/A' && <p>Awards: {clickedMediaInfo.Awards}</p>}
          </Col>
        </Row>
    </div>
    )
  }

export default SelectedMedia