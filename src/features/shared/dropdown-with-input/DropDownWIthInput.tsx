import React, { ChangeEvent, useEffect, useState } from 'react';
import { Divider, Input, Select, Space, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

type DropDownWithInputProps = {
  placeholder: string;
  onChange: (item: string) => void;
  options: string[];
  value?: string | undefined;
  disabled?: boolean;
};

function DropDownWithInput({
  disabled,
  placeholder,
  onChange,
  options,
  value,
}: DropDownWithInputProps) {
  useEffect(() => {
    setItems(options);
  }, [options]);

  const [items, setItems] = useState<string[]>([]);
  const [name, setName] = useState('');

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    const index = items.findIndex((item) => item === name);
    if (index === -1) {
      setItems([...items, name]);
      setName('');
    }
  };

  return (
    <Select
      disabled={disabled}
      value={value}
      onChange={onChange}
      style={{ width: 300 }}
      placeholder={placeholder}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space align="center" style={{ padding: '0 8px 4px' }}>
            <Input
              placeholder="Please enter item"
              value={name}
              onChange={onNameChange}
            />
            <Typography.Link onClick={addItem} style={{ whiteSpace: 'nowrap' }}>
              <PlusOutlined /> Add item
            </Typography.Link>
          </Space>
        </>
      )}
    >
      {items.map((item) => (
        <Option value={item} key={item}>
          {item}
        </Option>
      ))}
    </Select>
  );
}

export default DropDownWithInput;
