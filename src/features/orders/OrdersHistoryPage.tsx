import { MainLayout } from '../layouts/MainLayout';
import { useGetUserOrdersQuery } from './ordersSlice';
import OrdersTable from './OrdersTable';
import NetworkErrorResult from '../shared/network-error-result/NetworkErrorResult';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrdersHistoryPage() {
  // TODO: remove
  const userId = 1;
  const navigate = useNavigate();
  const {
    data: orders = [],
    isFetching,
    isError,
  } = useGetUserOrdersQuery(userId);

  const onOpen = (id: number) => {
    navigate(`/order/${id}`);
  };

  return (
    <MainLayout>
      <OrdersTable
        title="Orders History"
        orders={orders}
        isTableLoading={isFetching}
        isError={isError}
        onOpen={onOpen}
      />
      {isError && <NetworkErrorResult />}
    </MainLayout>
  );
}
