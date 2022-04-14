import { useDeclineOrderMutation, useGetUserOrdersQuery } from './ordersSlice';
import OrdersTable from './OrdersTable';
import NetworkErrorResult from '../shared/network-error-result/NetworkErrorResult';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { openNotification } from '../util/notification';
import { CheckCircleOutlined } from '@ant-design/icons';
import { message } from 'antd';

export default function OrdersHistoryPage() {
  // TODO: remove
  const userId = 1;
  const navigate = useNavigate();
  const {
    data: orders = [],
    isFetching,
    isError,
  } = useGetUserOrdersQuery(userId);
  const [declineOrder, { isLoading }] = useDeclineOrderMutation();

  const onOpen = (id: number) => {
    navigate(`/orders/${id}`);
  };

  const onDecline = async (id: number) => {
    try {
      await declineOrder(id).unwrap();
      openNotification(
        'Order Approval',
        'Declined successfully!',
        <CheckCircleOutlined />,
      );
    } catch (e) {
      message.error('Declining failed!');
    }
  };

  const isTableLoading = isFetching || isLoading;

  return (
    <>
      <OrdersTable
        title="Orders History"
        orders={orders}
        isTableLoading={isTableLoading}
        isError={isError}
        onOpen={onOpen}
        onDecline={onDecline}
      />
      {isError && <NetworkErrorResult />}
    </>
  );
}
