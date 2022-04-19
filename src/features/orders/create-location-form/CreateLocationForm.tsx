import React, { createRef, useEffect } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  FormInstance,
  InputNumber,
  message,
  Row,
  Space,
} from 'antd';
import { HomeFilled } from '@ant-design/icons';
import DropDownWIthInput from '../../shared/dropdown-with-input/DropDownWIthInput';
import { GeoLocation } from '../../locations/models/location.interface';
import { Street } from '../../locations/models/street.interface';
import { City } from '../../locations/models/city.interface';
import { DeepPartial } from '@reduxjs/toolkit';

interface CreateLocationFormState {
  cityFrom: string;
  streetFrom: string;
  homeFrom: number;
  cityTo: string;
  streetTo: string;
  homeTo: number;
}

type CreateLocationFormProps = {
  loading?: boolean;
  title?: string;
  fromLocation?: DeepPartial<GeoLocation>;
  toLocation?: DeepPartial<GeoLocation>;
  streets: Street[];
  cities: City[];
  disabled?: boolean;
  onSubmit: () => void;
  onFromLocationChanged: (location: DeepPartial<GeoLocation>) => void;
  onToLocationChanged: (location: DeepPartial<GeoLocation>) => void;
};

const CreateLocationForm = ({
  loading,
  disabled,
  title,
  streets,
  cities,
  onSubmit,
  onFromLocationChanged,
  onToLocationChanged,
  fromLocation,
  toLocation,
}: CreateLocationFormProps) => {
  const form = createRef<FormInstance>();

  useEffect(() => {
    form.current?.setFieldsValue({
      streetFrom: fromLocation?.street?.name,
      streetTo: toLocation?.street?.name,
      cityFrom: fromLocation?.city?.name,
      cityTo: toLocation?.city?.name,
      homeFrom: fromLocation?.home,
      homeTo: toLocation?.home,
    });
  }, [fromLocation, toLocation]);

  const onStreetChange = (key: 'streetTo' | 'streetFrom', street: string) => {
    form.current?.setFieldsValue({ [key]: street });
  };

  const onCityChange = (key: 'cityTo' | 'cityFrom', city: string) => {
    form.current?.setFieldsValue({ [key]: city });
  };

  const onFinish = (state: CreateLocationFormState) => {
    const toLocation = {
      home: state.homeTo,
      street: {
        name: state.streetTo,
      },
      city: {
        name: state.cityTo,
      },
    };

    const fromLocation = {
      home: state.homeFrom,
      street: {
        name: state.streetFrom,
      },
      city: {
        name: state.cityFrom,
      },
    };
    if (JSON.stringify(toLocation) === JSON.stringify(fromLocation)) {
      message.error('Locations must not be the same.');
      return;
    }

    onSubmit();
  };

  const onFormChanged = () => {
    const value: Partial<CreateLocationFormState> =
      form.current?.getFieldsValue();
    if (!value) return;

    onFromLocationChanged({
      street: { name: value.streetFrom },
      city: { name: value.cityFrom },
      home: value.homeFrom,
    });
    onToLocationChanged({
      street: { name: value.streetTo },
      city: { name: value.cityTo },
      home: value.homeTo,
    });
  };

  return (
    <Row style={{ height: '100%' }}>
      <Col span={24}>
        <Card loading={loading} title={title} style={{ height: '100%' }}>
          <Form
            onFieldsChange={onFormChanged}
            layout={'vertical'}
            ref={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            autoComplete="off"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <Space>
              <Form.Item
                label={'Source'}
                name="cityFrom"
                rules={[{ required: true, message: 'Missing source city' }]}
              >
                <DropDownWIthInput
                  disabled={disabled}
                  onChange={(city) => onCityChange('cityFrom', city)}
                  placeholder="City Name"
                  options={cities.map((city) => city.name)}
                />
              </Form.Item>

              <Form.Item
                label={'Destination'}
                name="cityTo"
                rules={[
                  { required: true, message: 'Missing destination city' },
                ]}
              >
                <DropDownWIthInput
                  disabled={disabled}
                  onChange={(city) => onCityChange('cityTo', city)}
                  placeholder="City Name"
                  options={cities.map((city) => city.name)}
                />
              </Form.Item>
            </Space>

            <Space>
              <Form.Item
                name="streetFrom"
                rules={[{ required: true, message: 'Missing source street' }]}
              >
                <DropDownWIthInput
                  disabled={disabled}
                  onChange={(street) => onStreetChange('streetFrom', street)}
                  placeholder="Street Name"
                  options={streets.map((street) => street.name)}
                />
              </Form.Item>

              <Form.Item
                name="streetTo"
                rules={[
                  { required: true, message: 'Missing destination street!' },
                ]}
              >
                <DropDownWIthInput
                  disabled={disabled}
                  onChange={(street) => onStreetChange('streetTo', street)}
                  placeholder="Street Name"
                  options={streets.map((street) => street.name)}
                />
              </Form.Item>
            </Space>

            <Space align={'center'} size={'large'}>
              <Form.Item
                name="homeFrom"
                rules={[{ required: true, message: 'Missing home' }]}
              >
                <InputNumber
                  disabled={disabled}
                  style={{ width: 'unset' }}
                  prefix={<HomeFilled />}
                  placeholder="From Home"
                  min={1}
                />
              </Form.Item>

              <Form.Item
                name="homeTo"
                rules={[{ required: true, message: 'Missing home' }]}
              >
                <InputNumber
                  disabled={disabled}
                  style={{ width: 'unset' }}
                  prefix={<HomeFilled />}
                  placeholder="To Home"
                  min={1}
                />
              </Form.Item>
            </Space>

            <Form.Item>
              <Button
                disabled={disabled}
                style={{ marginTop: '5px' }}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default CreateLocationForm;
