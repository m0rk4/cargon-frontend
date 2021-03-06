import React from 'react';
import NetworkErrorResult from '../../shared/network-error-result/NetworkErrorResult';
import {
  useApproveOrderMutation,
  useDeclineOrderMutation,
  useGetPendingOrdersQuery,
} from '../ordersApiSlice';
import OrdersTable from '../orders-table/OrdersTable';
import { openNotification } from '../../util/notification';
import { CheckCircleOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../routes/models/routes.enum';

function PendingOrdersPage() {
  const navigate = useNavigate();
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

  const onOpen = (id: number) => {
    navigate(`/${AppRoutes.ORDERS}/${id}`);
  };

  const isTableLoading = isFetching || isApproving || isDeclining;

  return (
    <>
      <OrdersTable
        title="Pending Orders"
        orders={orders}
        isTableLoading={isTableLoading}
        isError={isError}
        onApprove={onApprove}
        onDecline={onDecline}
        onOpen={onOpen}
      />
      {isError && <NetworkErrorResult />}
    </>
  );
}

export default PendingOrdersPage;
