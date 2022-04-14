export enum AppRoutes {
  DRIVER = 'driver',
  CREATE_TRANSPORT_APPLICATION = 'create-transport-application',
  CREATE_ORDER = 'create-order',
  ORDERS_HISTORY = 'order-history',
  APPROVED_ORDERS = 'approved-orders',
  DRIVER_HISTORY = 'driver-history',
  SIGN_IN = 'signin',
  SIGN_UP = 'signup',
  LANDING = 'landing',
  CUSTOMER = 'customer',
  MANAGEMENT = 'management',
  ORDERS = 'orders',
  USERS = 'users',
  SERVER_ERROR = 'server-error',
  TRANSPORT_APPLICATIONS = 'transport-applications',
  /**
   * Should not be included to `AllAppRoutes`.
   */
  NOT_EXISTING_ROUTE = 'NOT_EXISTING_ROUTE',
}

export const AllAppProtectedRoutes: string[] = [
  `${AppRoutes.MANAGEMENT}/${AppRoutes.ORDERS}`,
  `${AppRoutes.MANAGEMENT}/${AppRoutes.USERS}`,
  `${AppRoutes.MANAGEMENT}/${AppRoutes.TRANSPORT_APPLICATIONS}`,
  `${AppRoutes.CUSTOMER}/${AppRoutes.CREATE_ORDER}`,
  `${AppRoutes.CUSTOMER}/${AppRoutes.ORDERS_HISTORY}`,
  `${AppRoutes.DRIVER}/${AppRoutes.CREATE_TRANSPORT_APPLICATION}`,
  `${AppRoutes.DRIVER}/${AppRoutes.APPROVED_ORDERS}`,
  `${AppRoutes.DRIVER}/${AppRoutes.DRIVER_HISTORY}`,
];
