import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoutes } from '../models/routes.enum';
import HomePage from '../../home/home-page/HomePage';
import { useAuth } from '../../hooks/useAuth';
import ProtectedRoute from '../protected-route/ProtectedRoute';
import { UserRole } from '../../users/models/user.interface';
import Loading from '../../shared/loading';

/**
 * Management
 */
const UsersPage = lazy(() => import('../../users/users-page/UsersPage'));
const PendingOrdersPage = lazy(
  () => import('../../orders/pending-orders-page/PendingOrdersPage'),
);
const TransportApplicationsPage = lazy(
  () =>
    import(
      '../../transport-applications/transport-application-page/TransportApplicationsPage'
    ),
);

/**
 * Customer
 */
const CreateOrderPage = lazy(
  () => import('../../orders/create-order-page/CreateOrderPage'),
);
const UserOrdersHistoryPage = lazy(
  () => import('../../orders/user-orders-history-page/UserOrdersHistoryPage'),
);

/**
 * Driver
 */
const CreateTransportApplicationPage = lazy(
  () =>
    import(
      '../../transport-applications/create-transport-application-page/CreateTransportApplicationPage'
    ),
);
const ApprovedOrdersPage = lazy(
  () => import('../../orders/approved-orders-page/ApprovedOrdersPage'),
);
const DriverHistoryPage = lazy(
  () => import('../../orders/driver-history-page/DriverHistoryPage'),
);

/**
 * For common use
 */
const NotFoundPage = lazy(() => import('../../shared/not-found/NotFoundPage'));
const ServerErrorResult = lazy(
  () => import('../../shared/server-error/ServerErrorResult'),
);
const MainLayout = lazy(() => import('../../layouts/main-layout/MainLayout'));
const UnauthorizedLayout = lazy(
  () => import('../../layouts/unauthorized-layout/UnauthorizedLayout'),
);
const OrderPage = lazy(() => import('../../orders/order-page/OrderPage'));
const OrderCompletionPage = lazy(
  () => import('../../orders/order-completion-page/OrderCompletionPage'),
);
const LoginForm = lazy(() => import('../../auth/login-form/LoginForm'));
const RegisterForm = lazy(
  () => import('../../auth/register-form/RegisterForm'),
);
const LandingPage = lazy(
  () => import('../../landing/landing-page/LandingPage'),
);
const UserPage = lazy(() => import('../../users/user-page/UserPage'));

function IndexRoutes() {
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
          path={`/${AppRoutes.USERS}/:userId`}
          element={
            <Suspense fallback={<Loading />}>
              <UserPage />
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
                  <UserOrdersHistoryPage />
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
          path={`${AppRoutes.ORDERS}/:orderId/${AppRoutes.COMPLETION}`}
          element={
            <Suspense fallback={<Loading />}>
              <OrderCompletionPage />
            </Suspense>
          }
        />
        <Route
          path={`/${AppRoutes.SERVER_ERROR}`}
          element={
            <Suspense fallback={<Loading />}>
              <ServerErrorResult />
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
        element={
          <Suspense fallback={<Loading />}>
            <UnauthorizedLayout />
          </Suspense>
        }
      >
        <Route
          path={`/${AppRoutes.LANDING}`}
          element={
            <Suspense fallback={<Loading />}>
              <LandingPage />
            </Suspense>
          }
        />
        <Route
          path={`/${AppRoutes.SIGN_IN}`}
          element={
            <Suspense fallback={<Loading />}>
              <LoginForm />
            </Suspense>
          }
        />
        <Route
          path={`/${AppRoutes.SIGN_UP}`}
          element={
            <Suspense fallback={<Loading />}>
              <RegisterForm />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to={`/${AppRoutes.LANDING}`} />} />
      </Route>
    </Routes>
  );
}

export default IndexRoutes;
