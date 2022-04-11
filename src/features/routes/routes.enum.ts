export enum AppRoutes {
  DRIVER = 'driver',
  CREATE_TRANSPORT_APPLICATION = 'create-transport-application',
  CREATE_ORDER = 'create-order',
  ORDERS_HISTORY = 'order-history',
  CUSTOMER = 'customer',
  MANAGEMENT = 'management',
  ORDERS = 'orders',
  USERS = 'users',
  TRANSPORT_APPLICATIONS = 'transport-applications',
  /**
   * Should not be included to `AllAppRoutes`.
   */
  NOT_EXISTING_ROUTE = 'NOT_EXISTING_ROUTE',
}

export const AllAppRoutes: string[] = [
  `${AppRoutes.MANAGEMENT}/${AppRoutes.ORDERS}`,
  `${AppRoutes.MANAGEMENT}/${AppRoutes.USERS}`,
  `${AppRoutes.MANAGEMENT}/${AppRoutes.TRANSPORT_APPLICATIONS}`,
  `${AppRoutes.CUSTOMER}/${AppRoutes.CREATE_ORDER}`,
  `${AppRoutes.CUSTOMER}/${AppRoutes.ORDERS_HISTORY}`,
  `${AppRoutes.DRIVER}/${AppRoutes.CREATE_TRANSPORT_APPLICATION}`,
];
