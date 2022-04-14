import { Button, Card, Col, Form, Input, Layout, message, Row } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import AppFooter from '../shared/footer/AppFooter';
import { setCredentials, useLoginMutation } from './authSlice';
import { useAppDispatch } from '../hooks/store';
import { LoginRequest } from './model/login.request.interface';
import { LoginErrorResponse } from './model/login.error.response.interface';

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
      message.error((e as LoginErrorResponse).data.message);
    }
  };

  return (
    <Layout>
      <Layout.Content>
        <Row
          style={{ minHeight: 'calc(100vh - 125px)' }}
          align="middle"
          justify="space-around"
        >
          <Col span={8}>
            <Card title="Sign In to Cargon">
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: 'Please input your Email!' },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your Password!' },
                  ]}
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
          </Col>
        </Row>
      </Layout.Content>
      <AppFooter />
    </Layout>
  );
};

export default LoginPage;
