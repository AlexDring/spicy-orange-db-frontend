import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import SearchResults from './components/SearchResults'
import Recommendations from './components/Recommendations'
import RecommendedMedia from './components/RecommendedMedia'

// import { Layout, Menu, Input } from 'antd';
import Layout from 'antd/lib/layout'
import Menu from 'antd/lib/menu'
import Input from 'antd/lib/input'
import 'antd/lib/layout/style/css';
import 'antd/lib/menu/style/css';
import 'antd/lib/input/style/css';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
// import 'antd/dist/antd.css';

const { Header, Sider, Content } = Layout;
const { Search } = Input

const SearchForm = ({ setSearch }) => {
  const [ media, setMedia ] = useState("")

  const mediaSubmit = (e) => {
    e.preventDefault()
    setSearch(media)
    setMedia("")
  }

  return(
    <form onSubmit={mediaSubmit}>
      {/* <Input size="large" placeholder="Recommend a mooovie" onChange={({ target }) => setMedia(target.value)} prefix={<UserOutlined />} /> */}
      <Search
      placeholder="Search for a film or tv show"
      enterButton="Search"
      size="large"
      style={{ width: 400 }}
      onChange={({ target }) => setMedia(target.value)}
      onSubmit={mediaSubmit} 
    />
      {/* <input 
        type="text"
        placeholder="search for a film/tv show"
        onChange={({ target }) => setMedia(target.value)}
      /> */}
      {/* <button type="submit">search</button> */}
    </form>
  )
}

function App() {
  const [ search, setSearch ] = useState("")
  const [ results, setResults ] = useState(null)
  // const [selectedMedia, setSelectedMedia] = useState("")
  const [clickedRecommendation, setClickedRecommendation] = useState(null)
  const [ collapseMenu, setCollapseMenu ] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const tv = await axios.get(`http://www.omdbapi.com/?apikey=dd31d048&s=${search}`)
      // console.log(tv.data.Search);
      setResults(tv.data.Search)
    }
    fetchData()
  }, [search])

  const toggle = () => {
    setCollapseMenu(!collapseMenu)
  };

  return (
    <Router>
      <Layout style={{height: "100vh"}}>
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
              <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to='/recommendations'>
                  Recommendations
                </Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                <Link to='/add-recommendation'>
                  Add Recommendation
                </Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<UploadOutlined />}>
                nav 3
              </Menu.Item>
            </Menu>
        </Sider>
        <Layout>
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapseMenu ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
          <Switch>
            <Route path="/recommendations/:id">
              <RecommendedMedia clickedRecommendation={clickedRecommendation} />
            </Route>
            <Route path="/recommendations">
              <Recommendations setClickedRecommendation={setClickedRecommendation} />
            </Route>
            <Route path="/add-recommendation">
              <SearchForm setSearch={setSearch} />
              {results && <SearchResults results={results} />}
            </Route>
          </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
