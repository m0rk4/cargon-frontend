import { OrderStatus } from '../models/order-status.interface';
import { Alert } from 'antd';
import React from 'react';

type OrderStatusProps = {
  status: OrderStatus;
};

function OrderStatusMessage({ status }: OrderStatusProps) {
  const renderStatus = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return <Alert message="Pending" type="warning" showIcon />;
      case OrderStatus.APPROVED:
        return <Alert message="Approved" type="info" showIcon />;
      case OrderStatus.BOOKED:
        return <Alert message="Booked" type="info" showIcon />;
      case OrderStatus.COMPLETED:
        return <Alert message="Completed" type="success" showIcon />;
      case OrderStatus.DECLINED:
        return <Alert message="Declined" type="error" showIcon />;
    }
  };

  return renderStatus(status);
}

export default OrderStatusMessage;
