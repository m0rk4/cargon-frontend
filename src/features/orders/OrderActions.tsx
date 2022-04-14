import { Button, Card } from 'antd';
import { CarOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import React from 'react';

type OrderActionsProps = {
  onComplete: () => void;
  onBook: () => void;
  onRelease: () => void;
  onDecline: () => void;
};

export default function OrderActions({
  onBook,
  onDecline,
  onRelease,
  onComplete,
}: OrderActionsProps) {
  return (
    <Card
      style={{ height: '100%' }}
      actions={[
        <Button key="book" onClick={onBook} icon={<CarOutlined />}>
          Book
        </Button>,
        <Button
          key="decline"
          danger
          onClick={onDecline}
          type="primary"
          icon={<CloseOutlined />}
        >
          Decline Order
        </Button>,
        <Button
          key="release"
          danger
          onClick={onRelease}
          type="primary"
          icon={<CloseOutlined />}
        >
          Release Order
        </Button>,
        <Button
          key="complete"
          type="primary"
          onClick={onComplete}
          icon={<CheckOutlined />}
        >
          Complete
        </Button>,
      ]}
    >
      <Card.Meta
        title="Order Actions"
        description="Available order operations for you."
      />
    </Card>
  );
}
