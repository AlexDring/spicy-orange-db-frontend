import usersRouter from '../../services/users'
import { Switch } from 'antd'
import 'antd/lib/switch/style/css'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

const AddToWatchlist = (props) => {
  // console.log('watchlist', props)
  const { user, setUser, mediaId  } = props
  const [userData, setUserData] = useState()

  useEffect(() => {
    usersRouter.getUser(user.id)
    .then(response => 
      setUserData(response)
      )
  }, [setUserData])
  
  let inWatchlist = null
  if(userData) {
    inWatchlist = userData.watchlist.find(r => r.toWatch === mediaId)
  }
  console.log('userData', userData);
  console.log(inWatchlist)
  const toggleWatchlist =  async () => {
    if(!inWatchlist) {
      const watchListObject = { toWatch: mediaId, dateAdded: new Date() }
      const response = await usersRouter.addToWatchlist(userData.id, watchListObject)
      console.log(response);
      setUserData(response)
    } else {
      console.log(userData.id);
      await usersRouter.removeFromWatchlist(userData.id, inWatchlist._id)
      const updatedWatchlist = userData.watchlist.filter(u => u._id !== inWatchlist._id)
      console.log(updatedWatchlist);
      setUserData()
    }
  }

  if(!userData) {
    return null 
  }
  return(
    <div style={{paddingLeft: 40, paddingBottom: 20}}>
      <Switch
        defaultChecked={inWatchlist ? true : false}
        onClick={toggleWatchlist}
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
      /> Add to watchlist
    </div>
  )
}

export default AddToWatchlist