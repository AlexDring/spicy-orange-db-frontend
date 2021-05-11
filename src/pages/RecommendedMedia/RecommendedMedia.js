import { useParams } from 'react-router-dom'

import AddToWatchlist from './addToWatchlist'

import certified from '../../assets/images/Certified.png'
import fresh from '../../assets/images/fresh.png'
import stinker from '../../assets/images/stinker.png'

import { Col, Row, Image, Typography, PageHeader, List, Comment } from 'antd'
import 'antd/lib/col/style/css'
import 'antd/lib/row/style/css'
import 'antd/lib/image/style/css'
import 'antd/lib/typography/style/css'
import 'antd/lib/page-header/style/css'
import 'antd/lib/list/style/css'
import 'antd/lib/comment/style/css'

import ReviewSection from './ReviewSection'

const { Title, Text } = Typography;

const RecommendedMedia = (props) => {
  const { user, setUser, recommendations, setRecommendations } = props
  const id = useParams().id

  if(!recommendations) {
    return <div>Loading...</div>
  }
  
  const recommendedMedia = recommendations.find(m => m.id === id)

  const rottenIcons = (rottenScore) => {
    return(
      rottenScore > 900 ? certified 
    : rottenScore < 500 ? stinker
    : fresh
    )
  }

  let score
  if(recommendedMedia.rottenGas.length !== 0) {
    score = recommendedMedia.rottenGas.reduce((a, c) => a + c.score, 0) / recommendedMedia.rottenGas.length
  }

  const routes = [
    {
      path: './index',
      breadcrumbName: 'Home',
    },
    {
      path: 'first',
      breadcrumbName: `${recommendedMedia.Type}`,
    },
    {
      path: 'second',
      breadcrumbName: `${recommendedMedia.Title}`,
    },
  ]
      
  return(
    <>
      <PageHeader 
        title={<Title style={{marginBottom: 0}}>{recommendedMedia.Title}</Title>}
        subTitle={`${recommendedMedia.Year}, ${recommendedMedia.Runtime}`}
        onBack={() => null}
        breadcrumb={{routes}}
      />
      <Row gutter={[16, 16]}>
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
          <AddToWatchlist 
            user={user} 
            mediaId={recommendedMedia.id} 
            setUser={setUser} 
            />
          <ReviewSection 
            user={user}
            recommendations={recommendations}
            setRecommendations={setRecommendations}
            recommendedMedia={recommendedMedia} 
            externalRatings={recommendedMedia.Ratings} 
            rottenRatings={recommendedMedia.rottenGas}
            imdbRating={recommendedMedia.imdbID}
            rottenIcons={rottenIcons} 
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={18}>
          <Title level={2}>Movie Info</Title>
          <Text style={{textTransform: 'uppercase', fontWeight: 700, paddingRight: 15}}>Director</Text><Text>{recommendedMedia.Director}</Text><br />
          <Text style={{textTransform: 'uppercase', fontWeight: 700, paddingRight: 15}}>Writer</Text><Text>{recommendedMedia.Writer}</Text><br />
          <Text style={{textTransform: 'uppercase', fontWeight: 700, paddingRight: 15}}>Actors</Text><Text>{recommendedMedia.Actors}</Text><br />
          <Text style={{textTransform: 'uppercase', fontWeight: 700, paddingRight: 15}}>Production</Text><Text>{recommendedMedia.Production}</Text><br />
          <Text style={{textTransform: 'uppercase', fontWeight: 700, paddingRight: 15}}>Awards</Text><Text>{recommendedMedia.Awards}</Text><br />
          <Text style={{textTransform: 'uppercase', fontWeight: 700, paddingRight: 15}}>Plot</Text><Text>{recommendedMedia.Plot}</Text><br />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Title id='rottenGas' level={2}>Rotten Ga Ratings</Title>
      </Row>
      <Row>
        <List
          className="comment-list"
          // header={`${recommendedMedia.rottenGas.length} replies`}
          itemLayout="horizontal"
          dataSource={
            recommendedMedia.rottenGas.map(r => 
              (
                {
                actions: [<span>Reply to</span>],
                author: `${r.user}`,
                // avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                avatar: '',
                score: `${r.score}/1000`,
                content: (
                  <>
                    {r.score && 
                      <img 
                      width={score > 900 ? 25 : 25} 
                      src={rottenIcons(r.score)} 
                      alt="" /> }
                    <Text style={{paddingLeft: 10}}>{r.score}/1000</Text>
                    <p>{r.review}</p>
                  </>),
                datetime: (<span>12</span>),
              }
            ))
          }
          renderItem={item => (
            <Comment
              // actions={item.actions}
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
            />
          )}
        />
      </Row>
    </>
  )
 }

export default RecommendedMedia