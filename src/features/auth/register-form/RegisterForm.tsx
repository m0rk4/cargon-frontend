import React from 'react';
import { Button, Card, Form, Input, message } from 'antd';
import {
  CheckCircleOutlined,
  FieldStringOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { SignupRequest } from '../models/signup.request.interface';
import { AuthErrorResponse } from '../models/login.error.response.interface';
import { openNotification } from '../../util/notification';
import { useRegisterMutation } from '../../api/apiSlice';
import { AppRoutes } from '../../routes/models/routes.enum';

function RegisterForm() {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const onFinish = async (state: SignupRequest) => {
    try {
      await register(state).unwrap();
      openNotification(
        'Registration',
        'Registered successfully!',
        <CheckCircleOutlined />,
      );
      navigate('/signin');
    } catch (e) {
      message.error((e as AuthErrorResponse).data.message);
    }
  };

  return (
    <Card title="Sign Up to Cargon">
      <Form
        name="signup_form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              message: 'Please input your First Name!',
              min: 2,
              max: 50,
            },
          ]}
        >
          <Input prefix={<FieldStringOutlined />} placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[
            {
              required: true,
              message: 'Please input your Last Name!',
              min: 2,
              max: 50,
            },
          ]}
        >
          <Input prefix={<FieldStringOutlined />} placeholder="Last Name" />
        </Form.Item>
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
          rules={[
            {
              required: true,
              message: 'Please input your password > 5 characters!',
              min: 6,
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
              min: 6,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!'),
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Repeat Password"
          />
        </Form.Item>
        <Form.Item>
          <Button loading={isLoading} type="primary" htmlType="submit">
            Sign up
          </Button>
        </Form.Item>
        Or <Link to={`/${AppRoutes.SIGN_IN}`}>login now!</Link>
      </Form>
    </Card>
  );
}

export default RegisterForm;
