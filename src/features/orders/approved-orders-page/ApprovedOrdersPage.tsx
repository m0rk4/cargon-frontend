import OrdersTable from '../orders-table/OrdersTable';
import React from 'react';

import { useGetApprovedOrdersQuery } from '../ordersApiSlice';
import NetworkErrorResult from '../../shared/network-error-result/NetworkErrorResult';
import { useNavigate } from 'react-router-dom';

function ApprovedOrdersPage() {
  const navigate = useNavigate();
  const {
    data: orders = [],
    isFetching,
    isError,
  } = useGetApprovedOrdersQuery();

  const onOpen = (id: number) => {
    navigate(`/orders/${id}`);
  };

  return (
    <>
      <OrdersTable
        title="Available Orders"
        isTableLoading={isFetching}
        isError={isError}
        orders={orders}
        onOpen={onOpen}
      />
      {isError && <NetworkErrorResult />}
    </>
  );
}

export default ApprovedOrdersPage;
