import React, { useEffect, useRef } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  FormInstance,
  Input,
  InputNumber,
  message,
  Row,
  Space,
} from 'antd';
import {
  ColumnHeightOutlined,
  ColumnWidthOutlined,
  FieldStringOutlined,
  GoldOutlined,
  LineOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Cargo } from '../models/cargo.interface';

interface CreateCargoFormState {
  cargos?: Partial<Cargo>[];
}

type CreateCargoFormProps = {
  loading?: boolean;
  title: string;
  cargos?: Partial<Cargo>[];
  onChange: (v: Partial<Cargo>[]) => void;
  onSubmit: () => void;
  disabled?: boolean;
};

function CreateCargoForm({
  loading,
  disabled,
  title,
  cargos = [],
  onChange,
  onSubmit,
}: CreateCargoFormProps) {
  const form = useRef<FormInstance>(null);
  useEffect(() => {
    form.current?.setFieldsValue({
      cargos:
        cargos?.map((cargo) => ({
          width: cargo?.width,
          height: cargo?.height,
          length: cargo?.length,
          name: cargo?.name,
          weight: cargo?.weight,
        })) ?? [],
    });
  }, [cargos]);

  const onFinish = ({ cargos }: { cargos: Cargo[] }) => {
    if (!cargos?.length) {
      message.warn('Please enter at least one cargo!');
      return;
    }
    onSubmit();
  };

  const onFormChange = () => {
    const value: CreateCargoFormState = form.current?.getFieldsValue();

    if (!value?.cargos?.length) onChange([]);
    else onChange(value.cargos);
  };

  return (
    <Row style={{ height: '100%' }}>
      <Col span={24}>
        <Card loading={loading} title={title} style={{ height: '100%' }}>
          <Form
            ref={form}
            onFieldsChange={onFormChange}
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.List initialValue={cargos} name="cargos">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: 'flex',
                        marginBottom: 8,
                        alignItems: 'center',
                      }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, 'name']}
                        rules={[
                          { required: true, message: 'Missing Cargo Name' },
                        ]}
                      >
                        <Input
                          disabled={disabled}
                          style={{ width: 'unset' }}
                          prefix={<FieldStringOutlined />}
                          placeholder="Cargo Name"
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'weight']}
                        rules={[{ required: true, message: 'Missing weight' }]}
                      >
                        <InputNumber
                          disabled={disabled}
                          style={{ width: 'unset' }}
                          prefix={<GoldOutlined />}
                          placeholder="Weight"
                          min={0}
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'length']}
                        rules={[{ required: true, message: 'Missing length' }]}
                      >
                        <InputNumber
                          disabled={disabled}
                          style={{ width: 'unset' }}
                          prefix={<LineOutlined />}
                          placeholder="Length"
                          min={0}
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'height']}
                        rules={[{ required: true, message: 'Missing height' }]}
                      >
                        <InputNumber
                          disabled={disabled}
                          style={{ width: 'unset' }}
                          prefix={<ColumnHeightOutlined />}
                          placeholder="Height"
                          min={0}
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'width']}
                        rules={[{ required: true, message: 'Missing width' }]}
                      >
                        <InputNumber
                          disabled={disabled}
                          style={{ width: 'unset' }}
                          prefix={<ColumnWidthOutlined />}
                          placeholder="Width"
                          min={0}
                        />
                      </Form.Item>
                      {!disabled && (
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      )}
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      disabled={disabled}
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Cargo
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button disabled={disabled} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default CreateCargoForm;
