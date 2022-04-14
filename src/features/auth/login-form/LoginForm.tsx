import { Button, Card, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { setCredentials } from '../authSlice';
import { useAppDispatch } from '../../hooks/store';
import { LoginRequest } from '../models/login.request.interface';
import { AuthErrorResponse } from '../models/login.error.response.interface';
import { useLoginMutation } from '../../api/apiSlice';
import { AppRoutes } from '../../routes/models/routes.enum';

function LoginForm() {
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
        Or <Link to={`/${AppRoutes.SIGN_UP}`}>register now!</Link>
      </Form>
    </Card>
  );
}

export default LoginForm;
