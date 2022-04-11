import React, { lazy, Suspense, VFC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from './routes.enum';
import { Loading } from '../shared/loading';

/**
 * Management
 */
const UsersPage = lazy(() => import('../users/UsersPage'));
const OrdersPage = lazy(() => import('../orders/PendingOrdersPage'));
const TransportApplicationsPage = lazy(
  () => import('../transport-applications/TransportApplicationsPage'),
);

/**
 * Customer
 */
const CreateOrderPage = lazy(() => import('../orders/CreateOrderPage'));
const OrdersHistoryPage = lazy(() => import('../orders/OrdersHistoryPage'));

/**
 * Driver
 */
const CreateTransportApplicationPage = lazy(
  () => import('../transport-applications/CreateTransportApplicationPage'),
);
const ApprovedOrdersPage = lazy(() => import('../orders/ApprovedOrdersPage'));

/**
 * For common use
 */
const NotFoundPage = lazy(() => import('../shared/not-found/NotFoundPage'));

export const IndexRoutes: VFC = () => (
  <Routes>
    <Route
      path={`${AppRoutes.MANAGEMENT}/${AppRoutes.USERS}`}
      element={
        <Suspense fallback={<Loading />}>
          <UsersPage />
        </Suspense>
      }
    />
    <Route
      path={`${AppRoutes.MANAGEMENT}/${AppRoutes.ORDERS}`}
      element={
        <Suspense fallback={<Loading />}>
          <OrdersPage />
        </Suspense>
      }
    />
    <Route
      path={`${AppRoutes.MANAGEMENT}/${AppRoutes.TRANSPORT_APPLICATIONS}`}
      element={
        <Suspense fallback={<Loading />}>
          <TransportApplicationsPage />
        </Suspense>
      }
    />
    <Route
      path={`${AppRoutes.CUSTOMER}/${AppRoutes.CREATE_ORDER}`}
      element={
        <Suspense fallback={<Loading />}>
          <CreateOrderPage />
        </Suspense>
      }
    />
    <Route
      path={`${AppRoutes.CUSTOMER}/${AppRoutes.ORDERS_HISTORY}`}
      element={
        <Suspense fallback={<Loading />}>
          <OrdersHistoryPage />
        </Suspense>
      }
    />
    <Route
      path={`${AppRoutes.DRIVER}/${AppRoutes.CREATE_TRANSPORT_APPLICATION}`}
      element={
        <Suspense fallback={<Loading />}>
          <CreateTransportApplicationPage />
        </Suspense>
      }
    />
    <Route
      path={`${AppRoutes.DRIVER}/${AppRoutes.APPROVED_ORDERS}`}
      element={
        <Suspense fallback={<Loading />}>
          <ApprovedOrdersPage />
        </Suspense>
      }
    />
    <Route
      path="*"
      element={
        <Suspense fallback={<Loading />}>
          <NotFoundPage />
        </Suspense>
      }
    />
  </Routes>
);
