import { Button, Card, Col, Form, Input, message, Row, Select } from 'antd';
import { FieldStringOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import { useCreateDriverApplicationMutation } from '../driverApplicationsApiSlice';
import { AuthErrorResponse } from '../../auth/models/login.error.response.interface';

interface DriverApplicationFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  prefix: string;
}

type DriverApplicationFormProps = {
  onSuccess: () => void;
};

function DriverApplicationForm({ onSuccess }: DriverApplicationFormProps) {
  const [createDriverApplication, { isLoading }] =
    useCreateDriverApplicationMutation();

  const onFinish = async (form: DriverApplicationFormState) => {
    try {
      await createDriverApplication({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phoneNumber: form.prefix + form.phone,
      }).unwrap();
      message.success('Successfully Applied!');
      onSuccess();
    } catch (e) {
      message.error((e as AuthErrorResponse).data.message);
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 100 }}>
        <Select.Option value="+375">+375</Select.Option>
      </Select>
    </Form.Item>
  );

  return (
    <Row justify="center" align="middle" style={{ height: '100%' }}>
      <Col span={8}>
        <Card title="Become a Driver now!">
          <Form
            name="driver_application_form"
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
              <Input
                prefix={<FieldStringOutlined />}
                placeholder="First Name"
              />
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
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: 'Please input your phone number!' },
              ]}
            >
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item>
              <Button loading={isLoading} type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default DriverApplicationForm;
