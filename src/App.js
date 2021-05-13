import React, { useState, useEffect } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import recommendationsService from './services/recommendations'

import AddRecommendation from './pages/AddRecommendation/AddRecommendation'
import Recommendations from './pages/Recommendations/Recommendations'
import RecommendedMedia from './pages/RecommendedMedia/RecommendedMedia'
import WatchList from './pages/WatchList/WatchList'
import Login from './components/Login'

import Layout from 'antd/lib/layout'
import Menu from 'antd/lib/menu'
import 'antd/lib/layout/style/css';
import 'antd/lib/menu/style/css';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  VideoCameraOutlined,
  VideoCameraAddOutlined,
  SaveOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

function App() {
  const [ collapseMenu, setCollapseMenu ] = useState(false)
  const [recommendations, setRecommendations] = useState()
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    recommendationsService.getAll()
    .then(response => 
      setRecommendations(response.data))
  }, [setRecommendations])

  const toggle = () => {
    setCollapseMenu(!collapseMenu)
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(window.localStorage.getItem("loggedInSPODbUser"));
    if(loggedInUser) {
      setUser(loggedInUser)
      recommendationsService.setToken(loggedInUser.token)
    }
  }, [])

  return (
    <Router>
      <Layout>
        <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapseMenu}
        collapsedWidth="0"
        breakpoint="lg"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}>
          <div style={{height:100}} className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<VideoCameraOutlined />}>
                <Link to='/recommendations'>
                  Recommendations
                </Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraAddOutlined />}>
                <Link to='/add-recommendation'>
                  Add Recommendation
                </Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<SaveOutlined />}>
                <Link to='/watchlist'>
                  Watchlist
                </Link>
              </Menu.Item>
            </Menu>
        </Sider>
        <Layout>
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapseMenu ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
            { user === null ? <Link to='/login'>Login</Link> : <p>{user.username}</p>}
            {/* <Link to='/login'>Login</Link>  */}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: "100vh",
            }}
          >
          <Switch>
            <Route path="/login">
              <Login 
                user={user} 
                setUser={setUser} 
              />
            </Route>
            <Route path="/recommendations/:id">
              <RecommendedMedia 
                user={user}
                setUser={setUser}
                recommendations={recommendations} 
                setRecommendations={setRecommendations} 
              />
            </Route>
            <Route path="/recommendations">
              <Recommendations 
                recommendations={recommendations} 
              />
            </Route>
            <Route path="/add-recommendation">
              <AddRecommendation 
                setRecommendations={setRecommendations} 
                recommendations={recommendations} 
              />
            </Route>
            <Route path="/watchlist">
              <WatchList 
                user={user} 
              />
            </Route>
          </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
