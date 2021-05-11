import usersRouter from '../../services/users'
import recommendationsRouter from '../../services/recommendations'
import { Switch, Tooltip } from 'antd'
import 'antd/lib/switch/style/css'
import { HeartTwoTone, EyeTwoTone } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import recommendations from '../../services/recommendations';

const AddToWatchlist = (props) => {
  // console.log('watchlist', props)
  const { user, mediaId } = props
  const [userData, setUserData] = useState()

  useEffect(() => {
  usersRouter.getUser(user.id)
    .then(response => {
      console.log('response', response);
      setUserData(response)
    })
  }, [setUserData])
  
  let inWatchlist = null
  if(userData) {
    inWatchlist = userData.watchlist.find(r => r.toWatch === mediaId)
  }
  console.log('userData', userData);
  console.log('inWatchlist', inWatchlist)
  
  const toggleWatchlist =  async () => {
    if(!inWatchlist) {
      const watchListObject = { toWatch: mediaId, watched: false, dateAdded: new Date() }
      const response = await usersRouter.addToWatchlist(userData.id, watchListObject)
      setUserData(response)
    } else {
      await usersRouter.removeFromWatchlist(userData.id, inWatchlist._id)
      const watchlistRemove = {
        ...userData,
        watchlist: userData.watchlist.filter(w => w._id !== inWatchlist._id)
      } 
      setUserData(watchlistRemove)
    }
  }

  const toggleWatched = async () => {
    console.log(mediaId, !userData.watched.includes(mediaId));
    if(!userData.watched.includes(mediaId)) {
      const watchedObject = {
        userId: userData.id,
        addToWatched: mediaId
      }
      console.log(watchedObject);
      const response = await recommendationsRouter.markAsWatched(mediaId, watchedObject)
      setUserData(response)
    } else {
      const removeWatched = {
        ...userData,
        watched: userData.watched.filter(w => w !== mediaId)
      }
      console.log(removeWatched);
      setUserData(removeWatched)
      await recommendationsRouter.removeWatched(mediaId)
    }
  }

  if(!userData) {
    return(<div>Loading...</div>)
  }
  return(
    <div style={{paddingLeft: 40, paddingBottom: 20, width: 120, textAlign: "center"}}>
      <Tooltip title={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}>
        <HeartTwoTone 
          onClick={toggleWatchlist} 
          twoToneColor={inWatchlist ? "#eb2f96" : "ddd"} 
          style={{fontSize: 30, cursor: "pointer"}} 
        />
        <div>{inWatchlist ? "In watchlist" : "Add to watchlist"}</div>
      </Tooltip>
      <div>
        <EyeTwoTone
          onClick={toggleWatched} 
          style={{fontSize: 30, cursor: "pointer"}}
          twoToneColor={userData && userData.watched.includes(mediaId) ? '#eb2f96' : "ddd"} 
        />
        <p>{userData && userData.watched.includes(mediaId)  ? 'Watched' : "Watched it?"}</p>
      </div>
    </div>
  )
}

export default AddToWatchlist