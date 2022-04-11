import { OrderStatus } from './models/order-status.interface';
import React from 'react';

import { Tag } from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';

type OrderStatusTagProps = {
  status: OrderStatus;
};

export default function OrderStatusTag({ status }: OrderStatusTagProps) {
  const renderTag = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return (
          <Tag icon={<ClockCircleOutlined />} color="default">
            Pending
          </Tag>
        );
      case OrderStatus.APPROVED:
        return <Tag color="warning">Approved</Tag>;
      case OrderStatus.BOOKED:
        return (
          <Tag icon={<SyncOutlined spin />} color="processing">
            Booked
          </Tag>
        );
      case OrderStatus.COMPLETED:
        return (
          <Tag icon={<CheckCircleOutlined />} color="success">
            Completed
          </Tag>
        );
      case OrderStatus.DECLINED:
        return (
          <Tag icon={<CloseCircleOutlined />} color="error">
            Declined
          </Tag>
        );
    }
  };

  return renderTag(status);
}
