import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from './routes.enum';
import { Loading } from '../shared/loading';

const CreateTransportApplicationPage = lazy(
  () => import('../transport-applications/CreateTransportApplicationPage'),
);

const ApprovedOrdersPage = lazy(() => import('../orders/ApprovedOrdersPage'));

export const DriverRoutes = () => (
  <Routes>
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
  </Routes>
);
