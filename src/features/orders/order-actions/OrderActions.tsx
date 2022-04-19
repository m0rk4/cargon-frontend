import { Button, Card } from 'antd';
import { CarOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import React from 'react';
import { Order } from '../models/order.interface';
import { useAuth } from '../../hooks/useAuth';
import { OrderStatus } from '../models/order-status.interface';
import { UserRole } from '../../users/models/user.interface';

type OrderActionsProps = {
  loading?: boolean;
  order?: Order;
  onComplete: () => void;
  onBook: () => void;
  onRelease: () => void;
  onDecline: () => void;
};

function OrderActions({
  loading,
  order,
  onBook,
  onDecline,
  onRelease,
  onComplete,
}: OrderActionsProps) {
  const { user } = useAuth();

  const isBookAvailable =
    order?.status === OrderStatus.APPROVED &&
    (user?.role === UserRole.DRIVER || user?.role === UserRole.ADMIN);

  const isDeclineAvailable =
    (order?.status === OrderStatus.APPROVED ||
      order?.status === OrderStatus.PENDING) &&
    (user?.role === UserRole.MANAGER ||
      user?.role === UserRole.ADMIN ||
      user?.id === order?.user?.id);

  const isReleaseAvailable =
    order?.status === OrderStatus.BOOKED && user?.id === order?.driver?.id;

  const isCompleteAvailable =
    order?.status === OrderStatus.BOOKED && user?.id === order?.driver?.id;

  const actions: React.ReactNode[] = [];

  if (isBookAvailable)
    actions.push(
      <Button key="book" onClick={onBook} icon={<CarOutlined />}>
        Book
      </Button>,
    );

  if (isDeclineAvailable)
    actions.push(
      <Button
        key="decline"
        danger
        onClick={onDecline}
        type="primary"
        icon={<CloseOutlined />}
      >
        Decline Order
      </Button>,
    );

  if (isReleaseAvailable)
    actions.push(
      <Button
        key="release"
        danger
        onClick={onRelease}
        type="primary"
        icon={<CloseOutlined />}
      >
        Release Order
      </Button>,
    );

  if (isCompleteAvailable)
    actions.push(
      <Button
        key="complete"
        type="primary"
        onClick={onComplete}
        icon={<CheckOutlined />}
      >
        Complete
      </Button>,
    );

  return (
    <Card loading={loading} style={{ height: '100%' }} actions={actions}>
      <Card.Meta
        title="Order Actions"
        description="Available order operations for you."
      />
    </Card>
  );
}

export default OrderActions;
