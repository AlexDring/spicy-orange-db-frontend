import { Col, Row, Descriptions, Typography, Button } from 'antd';
import axios from 'axios'

import 'antd/lib/col/style/css'
import 'antd/lib/row/style/css'
import 'antd/lib/descriptions/style/css'
import 'antd/lib/row/style/css'

const { Text, Title } = Typography;

const SelectedMedia = (props) => {
  console.log(props);
  const { selectedMedia } = props

  const addRecommendation = (e) => {
    e.preventDefault()
    console.log(selectedMedia)
    const recommendedMediaObject = {
      ...selectedMedia.data,
      dateAdded: new Date(),
      rottenGas: [{
        score: 500,
        user: null
      }]
    }
    axios.post('http://localhost:3001/recommendations',recommendedMediaObject)
    .then(response => {
      console.log(response);
    })
  }

    return(
      <div>
        <Row>
          <Col span={10}>
            <img src={selectedMedia.data.Poster} alt=""/>
          </Col>
          <Col span={14}>
            <Title level={1}>{selectedMedia.data.Title}</Title>
            <Button onClick={addRecommendation}>Add to Recommendations</Button>
            <Descriptions style={{marginTop: 30}}>
              <Descriptions.Item label="Type">{selectedMedia.data.Type}</Descriptions.Item>
              <Descriptions.Item label="Year">{selectedMedia.data.Year}</Descriptions.Item>
              <Descriptions.Item label="Runtime">{selectedMedia.data.Runtime}</Descriptions.Item>
            </Descriptions>
            <p>Genres: {selectedMedia.data.Genre}</p>
            {selectedMedia.data.Ratings.map(r => 
              <p key={r.Source}>{r.Source} <strong>{r.Value}</strong></p>
            )}
          </Col>
        </Row>
        <Row style={{marginTop: 30}}>
        <Col span={24}>
            <p>Director: {selectedMedia.data.Director}</p>
            <p>Writer: {selectedMedia.data.Writer}</p>
            <p>Actors: {selectedMedia.data.Actors}</p>
            <p>Plot: {selectedMedia.data.Plot}</p>
            {selectedMedia.data.Awards !== 'N/A' && <p>Awards: {selectedMedia.data.Awards}</p>}
          </Col>
        </Row>
    </div>
    )
  }

export default SelectedMedia