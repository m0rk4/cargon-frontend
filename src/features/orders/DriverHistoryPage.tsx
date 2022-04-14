import OrdersTable from './OrdersTable';
import React from 'react';
import { useGetDriverOrdersQuery } from './ordersSlice';
import { useNavigate } from 'react-router-dom';

export default function DriverHistoryPage() {
  const navigate = useNavigate();
  const { data: orders = [], isLoading, isError } = useGetDriverOrdersQuery();

  const onOpen = (id: number) => {
    navigate(`/orders/${id}`);
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
