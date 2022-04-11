import React, { VFC } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import NetworkErrorResult from '../shared/network-error-result/NetworkErrorResult';
import {
  useApproveOrderMutation,
  useDeclineOrderMutation,
  useGetPendingOrdersQuery,
} from './ordersSlice';
import OrdersTable from './OrdersTable';
import { openNotification } from '../util/notification';
import { CheckCircleOutlined } from '@ant-design/icons';
import { message } from 'antd';

const PendingOrdersPage: VFC = () => {
  const { data: orders = [], isFetching, isError } = useGetPendingOrdersQuery();
  const [approveOrder, { isLoading: isApproving }] = useApproveOrderMutation();
  const [declineOrder, { isLoading: isDeclining }] = useDeclineOrderMutation();

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

  const onApprove = async (id: number) => {
    try {
      await approveOrder(id).unwrap();
      openNotification(
        'Order Approval',
        'Approved successfully!',
        <CheckCircleOutlined />,
      );
    } catch (e) {
      message.error('Approving failed!');
    }
  };

  const isTableLoading = isFetching || isApproving || isDeclining;

  return (
    <MainLayout>
      <OrdersTable
        title="Pending Orders"
        orders={orders}
        isTableLoading={isTableLoading}
        isError={isError}
        onApprove={onApprove}
        onDecline={onDecline}
      />
      {isError && <NetworkErrorResult />}
    </MainLayout>
  );
};

export default PendingOrdersPage;
