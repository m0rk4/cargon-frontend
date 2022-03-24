import { Route, Routes } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import { Loading } from '../components/loading';
import { AppRoutes } from './routes.enum';

const UsersPage = lazy(() => import('../pages/users/UsersPage'));
const OrdersPage = lazy(() => import('../pages/orders/OrdersPage'));
const TransportApplicationsPage = lazy(
  () => import('../pages/transport-applications/TransportApplicationsPage'),
);

export const ManagementRoutes = () => {
  return (
    <Routes>
      <Route
        path={AppRoutes.USERS}
        element={
          <Suspense fallback={<Loading />}>
            <UsersPage />
          </Suspense>
        }
      />
      <Route
        path={AppRoutes.ORDERS}
        element={
          <Suspense fallback={<Loading />}>
            <OrdersPage />
          </Suspense>
        }
      />
      <Route
        path={AppRoutes.TRANSPORT_APPLICATIONS}
        element={
          <Suspense fallback={<Loading />}>
            <TransportApplicationsPage />
          </Suspense>
        }
      />
    </Routes>
  );
};