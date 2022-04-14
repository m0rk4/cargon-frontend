import React, { lazy, Suspense, VFC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoutes } from './routes.enum';
import { Loading } from '../shared/loading';
import HomePage from '../home/HomePage';
import { useAuth } from '../hooks/useAuth';
import ProtectedRoute from './ProtectedRoute';
import { UserRole } from '../users/models/user.interface';

/**
 * Management
 */
const UsersPage = lazy(() => import('../users/UsersPage'));
const PendingOrdersPage = lazy(() => import('../orders/PendingOrdersPage'));
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
const DriverHistoryPage = lazy(() => import('../orders/DriverHistoryPage'));

/**
 * For common use
 */
const NotFoundPage = lazy(() => import('../shared/not-found/NotFoundPage'));
const ServerErrorPage = lazy(
  () => import('../shared/server-error/ServerErrorPage'),
);
const MainLayout = lazy(() => import('../layouts/MainLayout'));
const OrderPage = lazy(() => import('../orders/OrderPage'));
const OrderCompletionPage = lazy(() => import('../orders/OrderCompletionPage'));
const LoginPage = lazy(() => import('../auth/LoginPage'));

export const IndexRoutes: VFC = () => {
  const { user } = useAuth();

  const is = (role: UserRole) => user?.role === role;

  return (
    <Routes>
      {/**
       * Routes for authorized user.
       */}
      <Route
        path="/"
        element={
          <ProtectedRoute
            isAvailable={!!user}
            fallbackPath={`/${AppRoutes.SIGN_IN}`}
            outlet={
              <Suspense fallback={<Loading />}>
                <MainLayout />
              </Suspense>
            }
          />
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<Loading />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path={`/${AppRoutes.MANAGEMENT}/${AppRoutes.USERS}`}
          element={
            <ProtectedRoute
              isAvailable={is(UserRole.ADMIN) || is(UserRole.MANAGER)}
              fallbackPath="/"
              outlet={
                <Suspense fallback={<Loading />}>
                  <UsersPage />
                </Suspense>
              }
            />
          }
        />
        <Route
          path={`/${AppRoutes.MANAGEMENT}/${AppRoutes.ORDERS}`}
          element={
            <ProtectedRoute
              isAvailable={is(UserRole.ADMIN) || is(UserRole.MANAGER)}
              fallbackPath="/"
              outlet={
                <Suspense fallback={<Loading />}>
                  <PendingOrdersPage />
                </Suspense>
              }
            />
          }
        />
        <Route
          path={`/${AppRoutes.MANAGEMENT}/${AppRoutes.TRANSPORT_APPLICATIONS}`}
          element={
            <ProtectedRoute
              isAvailable={is(UserRole.ADMIN) || is(UserRole.MANAGER)}
              fallbackPath="/"
              outlet={
                <Suspense fallback={<Loading />}>
                  <TransportApplicationsPage />
                </Suspense>
              }
            />
          }
        />
        <Route
          path={`/${AppRoutes.CUSTOMER}/${AppRoutes.CREATE_ORDER}`}
          element={
            <ProtectedRoute
              isAvailable={is(UserRole.ADMIN) || is(UserRole.CUSTOMER)}
              fallbackPath="/"
              outlet={
                <Suspense fallback={<Loading />}>
                  <CreateOrderPage />
                </Suspense>
              }
            />
          }
        />
        <Route
          path={`/${AppRoutes.CUSTOMER}/${AppRoutes.ORDERS_HISTORY}`}
          element={
            <ProtectedRoute
              isAvailable={is(UserRole.ADMIN) || is(UserRole.CUSTOMER)}
              fallbackPath="/"
              outlet={
                <Suspense fallback={<Loading />}>
                  <OrdersHistoryPage />
                </Suspense>
              }
            />
          }
        />
        <Route
          path={`/${AppRoutes.DRIVER}/${AppRoutes.DRIVER_HISTORY}`}
          element={
            <ProtectedRoute
              isAvailable={is(UserRole.ADMIN) || is(UserRole.DRIVER)}
              fallbackPath="/"
              outlet={
                <Suspense fallback={<Loading />}>
                  <DriverHistoryPage />
                </Suspense>
              }
            />
          }
        />
        <Route
          path={`/${AppRoutes.DRIVER}/${AppRoutes.CREATE_TRANSPORT_APPLICATION}`}
          element={
            <ProtectedRoute
              isAvailable={is(UserRole.ADMIN) || is(UserRole.DRIVER)}
              fallbackPath="/"
              outlet={
                <Suspense fallback={<Loading />}>
                  <CreateTransportApplicationPage />
                </Suspense>
              }
            />
          }
        />
        <Route
          path={`/${AppRoutes.DRIVER}/${AppRoutes.APPROVED_ORDERS}`}
          element={
            <ProtectedRoute
              isAvailable={is(UserRole.ADMIN) || is(UserRole.DRIVER)}
              fallbackPath="/"
              outlet={
                <Suspense fallback={<Loading />}>
                  <ApprovedOrdersPage />
                </Suspense>
              }
            />
          }
        />
        <Route
          path={`${AppRoutes.ORDERS}/:orderId`}
          element={
            <Suspense fallback={<Loading />}>
              <OrderPage />
            </Suspense>
          }
        />
        <Route
          path={`${AppRoutes.ORDERS}/:orderId/completion`}
          element={
            <Suspense fallback={<Loading />}>
              <OrderCompletionPage />
            </Suspense>
          }
        />
        <Route
          path="/server-error"
          element={
            <Suspense fallback={<Loading />}>
              <ServerErrorPage />
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
      </Route>
      {/**
       * Routes for unauthorized user.
       * - signin
       * - signup
       * - * -> signin
       */}
      <Route
        path={`/${AppRoutes.SIGN_IN}`}
        element={
          <Suspense fallback={<Loading />}>
            <LoginPage />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to={`/${AppRoutes.SIGN_IN}`} />} />
    </Routes>
  );
};
