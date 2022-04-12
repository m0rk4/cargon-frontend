import OrdersTable from './OrdersTable';
import React from 'react';
import { useGetDriverOrdersQuery } from './ordersSlice';
import { useNavigate } from 'react-router-dom';

export default function DriverHistoryPage() {
  // TODO: remove
  const driverId = 1;
  const navigate = useNavigate();
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetDriverOrdersQuery(driverId);

  const onOpen = (id: number) => {
    navigate(`/order/${id}`);
  };

  return (
    <OrdersTable
      title="Driver History"
      isTableLoading={isLoading}
      isError={isError}
      orders={orders}
      onOpen={onOpen}
    />
  );
}
