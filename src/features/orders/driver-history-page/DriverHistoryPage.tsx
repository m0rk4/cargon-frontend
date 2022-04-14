import OrdersTable from '../orders-table/OrdersTable';
import React from 'react';
import { useGetDriverOrdersQuery } from '../ordersApiSlice';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../routes/models/routes.enum';

function DriverHistoryPage() {
  const navigate = useNavigate();
  const { data: orders = [], isLoading, isError } = useGetDriverOrdersQuery();

  const onOpen = (id: number) => {
    navigate(`/${AppRoutes.ORDERS}/${id}`);
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

export default DriverHistoryPage;
