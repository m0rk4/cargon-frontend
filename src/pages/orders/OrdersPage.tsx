import React, { useEffect, useState } from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { notification, Table, TableColumnsType } from 'antd';
import { UserItem } from '../users/UsersPage';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Order } from './models/order.interface';
import { GeoLocation } from './models/location.interface';

export interface OrderItem extends Order {
  key: string;
}

const sampleOrders: Order[] = [
  {
    id: 1,
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    owner: {
      id: 3,
      firstName: 'Vlad',
      lastName: 'Brown',
      email: 'test3@mail.com',
      isRegistrationApproved: true,
      isActive: true,
    },
    fromLocation: {
      city: { name: 'Moscow' },
      street: { name: 'Independence' },
      home: 123,
    },
    toLocation: {
      city: { name: 'Moscow' },
      street: { name: 'Eastern' },
      home: 321,
    },
    status: {
      statusName: 'Awaiting Approval',
    },
  },
];

const OrdersPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<OrderItem[]>([]);

  useEffect(() => {
    async function fetchUnapprovedOrders() {
      /**
       * TODO: replace with real getUnapprovedOrders call.
       */
      const orders: Order[] = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(sampleOrders);
        }, 1000);
      });

      setOrders(
        orders.map(
          (order): OrderItem => ({ ...order, key: order.id.toString() }),
        ),
      );
      setLoading(false);
    }

    fetchUnapprovedOrders();
  }, []);

  const renderUser = (user: UserItem) => (
    <a>{`${user.firstName} ${user.lastName}`}</a>
  );
  const renderLocation = (location: GeoLocation) => (
    <div>{`${location.city.name}, ${location.street.name}, ${location.home}`}</div>
  );

  const openNotification = () => {
    notification.info({
      message: `Order Approval`,
      description: `Approved successfully.`,
      placement: 'bottomRight',
      icon: <CheckCircleOutlined />,
    });
  };

  const columns: TableColumnsType<any> | undefined = [
    {
      title: 'Owner',
      key: 'owner',
      dataIndex: 'owner',
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
      title: 'Created',
      key: 'created',
      dataIndex: 'createdAt',
    },
    {
      title: 'Updated',
      key: 'updated',
      dataIndex: 'updatedAt',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: OrderItem) => {
        const onClick = async () => {
          setLoading(true);
          /**
           * TODO: replace with real API call.
           */
          await fetch('https://jsonplaceholder.typicode.com/todos/1');

          setLoading(false);

          const index = orders.findIndex((order) => order.id === record.id);
          if (index === -1) return;

          setOrders([...orders.slice(0, index), ...orders.slice(index + 1)]);
          openNotification();
        };

        return <a onClick={onClick}>Approve</a>;
      },
    },
  ];

  return (
    <MainLayout>
      <Table
        title={() => 'Orders'}
        bordered
        loading={loading}
        columns={columns}
        dataSource={orders}
      />
    </MainLayout>
  );
};

export default OrdersPage;
