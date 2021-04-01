import { useState } from 'react'
import loginService from '../services/login'
import recommendationsService from '../services/recommendations'

import { Form, Input, Button } from 'antd';

import 'antd/lib/form/style'
import 'antd/lib/input/style'
import 'antd/lib/button/style'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Login = ({ user, setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // console.log(username, password)
  const onFinish = async (values) => {
    console.log('Success:', values);
    try {
      const user = await loginService.login({ username, password })
      console.log(user);
      window.localStorage.setItem("loggedInSPODbUser", JSON.stringify(user))

      recommendationsService.setToken(user.token) //LOOK AT THIS https://fullstackopen.com/en/part5/login_in_frontend#handling-login.
      // On login a token is set to the Authorization header which is then sent with a recommendations, giving them permission to add recommendations.
      setUser(user)
      setUsername("")
      setPassword("")
    } catch {
      // setErrorMessage('Wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
      console.log('Wrong credentials');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Wrong credentials:', errorInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('logging in with', username, password);
    try {
      const user = await loginService.login({ username, password })

      setUser(user)
      setUsername("")
      setPassword("")
    } catch {
      // setErrorMessage('Wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
      console.log('Wrong credentials');
    }
  } 
  
  if(user) {
    return (
    <Button onClick={() => window.localStorage.removeItem('loggedInSPODbUser')}>Logout</Button>
    )
  }

  return (
    <>
      <Form
        {...layout}
        name="login"
        onSubmit={handleLogin}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          value={username}
          rules={[{ required: true, message: 'Please input your username!' }]}
          onChange={(({ target }) => setUsername(target.value))}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          value={password}
          rules={[{ required: true, message: 'Please input your password!' }]}
          onChange={(({ target }) => setPassword(target.value))}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default Login