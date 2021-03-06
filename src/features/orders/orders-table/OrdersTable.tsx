import { Space, Table, Typography } from 'antd';
import CargoList from '../cargo-list/CargoList';
import React from 'react';
import { Order } from '../models/order.interface';
import useSortedByTime from '../../hooks/useSortedByTime';
import { User } from '../../users/models/user.interface';
import { OrderStatus } from '../models/order-status.interface';
import OrderStatusTag from '../order-status-tag/OrderStatusTag';
import UserLink from '../../shared/user-link/UserLink';
import { GeoLocation } from '../../locations/models/location.interface';
import { formatDistanceToNow } from 'date-fns';
import {
  BookOutlined,
  CheckOutlined,
  CloseOutlined,
  ImportOutlined,
} from '@ant-design/icons';

type OrdersTableProps = {
  title: string;
  isTableLoading: boolean;
  isError: boolean;
  orders: Order[];
  onApprove?: (id: number) => void;
  onDecline?: (id: number) => void;
  onOpen?: (id: number) => void;
  onBook?: (id: number) => void;
};

function OrdersTable({
  title,
  orders,
  isTableLoading,
  isError,
  onApprove,
  onDecline,
  onOpen,
  onBook,
}: OrdersTableProps) {
  const sortedOrders = useSortedByTime<Order>(
    orders,
    (order) => new Date(order.updatedAt),
  );

  const renderUser = (user: User) => <UserLink user={user} />;

  const renderLocation = ({ city, street, home }: GeoLocation) => (
    <div>{`${city.name}, ${street.name}, ${home}`}</div>
  );

  const renderAction = ({ id, status }: Order) => {
    const isDecliningAvailable =
      onDecline &&
      (status === OrderStatus.PENDING || status === OrderStatus.APPROVED);
    return (
      <Space size={'large'}>
        {onApprove && (
          <a onClick={() => onApprove(id)}>
            Approve <CheckOutlined />
          </a>
        )}
        {isDecliningAvailable && (
          <a onClick={() => onDecline(id)}>
            Decline <CloseOutlined />
          </a>
        )}
        {onOpen && (
          <a onClick={() => onOpen(id)}>
            Open <ImportOutlined />
          </a>
        )}
        {onBook && (
          <a onClick={() => onBook(id)}>
            Book <BookOutlined />
          </a>
        )}
      </Space>
    );
  };

  const renderTime = (time: string) =>
    formatDistanceToNow(new Date(time), { addSuffix: true });

  const columns = [
    {
      title: 'Owner',
      key: 'owner',
      dataIndex: 'user',
      render: renderUser,
    },
    {
      title: 'From',
      key: 'from',
      dataIndex: 'fromLocation',
      render: renderLocation,
    },
    {
      title: 'To',
      key: 'to',
      dataIndex: 'toLocation',
      render: renderLocation,
    },
    {
      title: 'Driver',
      key: 'driver',
      dataIndex: 'driver',
      render: (driver: User) => (driver ? renderUser(driver) : <div>None</div>),
    },
    {
      title: 'Created',
      key: 'created',
      dataIndex: 'createdAt',
      render: renderTime,
    },
    {
      title: 'Updated',
      key: 'updated',
      dataIndex: 'updatedAt',
      render: renderTime,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status: OrderStatus) => <OrderStatusTag status={status} />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: renderAction,
    },
  ];

  return (
    <Table
      title={() => <Typography.Title level={2}>{title}</Typography.Title>}
      loading={isTableLoading || isError}
      columns={columns}
      expandable={{
        expandedRowRender: ({ cargos }) => <CargoList cargos={cargos} />,
      }}
      dataSource={sortedOrders.map((order) => ({
        ...order,
        key: order.id,
      }))}
      pagination={{ pageSize: 8 }}
    />
  );
}

export default OrdersTable;
