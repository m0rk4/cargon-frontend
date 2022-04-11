import { List } from 'antd';
import React from 'react';

import { Cargo } from './models/cargo.interface';
import { CodeSandboxOutlined } from '@ant-design/icons';

type CargoListProps = {
  cargos: Cargo[];
};

export default function CargoList({ cargos }: CargoListProps) {
  const getDescription = (cargo: Cargo) =>
    `Width x Length x Height x Weight = ${cargo.width} x ${cargo.length} x ${cargo.height} x ${cargo.weight}`;

  return (
    <List>
      {cargos.map((cargo) => (
        <List.Item key={cargo.id}>
          <List.Item.Meta
            avatar={<CodeSandboxOutlined />}
            title={cargo.name}
            description={getDescription(cargo)}
          />
        </List.Item>
      ))}
    </List>
  );
}
