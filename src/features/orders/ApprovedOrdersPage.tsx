import OrdersTable from './OrdersTable';
import React from 'react';

import { useGetApprovedOrdersQuery } from './ordersSlice';
import NetworkErrorResult from '../shared/network-error-result/NetworkErrorResult';
import { useNavigate } from 'react-router-dom';

export default function ApprovedOrdersPage() {
  const navigate = useNavigate();
  const {
    data: orders = [],
    isFetching,
    isError,
  } = useGetApprovedOrdersQuery();

  const onBook = (id: number) => {
    console.log(id);
  };

  const onOpen = (id: number) => {
    navigate(`/order/${id}`);
  };

  return (
    <>
      <OrdersTable
        title="Available Orders"
        isTableLoading={isFetching}
        isError={isError}
        orders={orders}
        onBook={onBook}
        onOpen={onOpen}
      />
      {isError && <NetworkErrorResult />}
    </>
  );
}
