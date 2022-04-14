import { Button, Card, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { setCredentials, useLoginMutation } from './authSlice';
import { useAppDispatch } from '../hooks/store';
import { LoginRequest } from './model/login.request.interface';
import { AuthErrorResponse } from './model/login.error.response.interface';

const LoginPage = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFinish = async (state: LoginRequest) => {
    try {
      const loginResponse = await login(state).unwrap();
      dispatch(setCredentials(loginResponse));
      navigate('/');
    } catch (e) {
      message.error((e as AuthErrorResponse).data.message);
    }
  };

  return (
    <Card title="Sign In to Cargon">
      <Form
        name="signin_login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
        Or <Link to="/signup">register now!</Link>
      </Form>
    </Card>
  );
};

export default LoginPage;
