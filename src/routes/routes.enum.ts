export enum AppRoutes {
  ORDERS = 'orders',
  USERS = 'users',
  TRANSPORT_APPLICATIONS = 'transport-applications',
  /**
   * Should not be included to `AllAppRoutes`.
   */
  NOT_EXISTING_ROUTE = 'NOT_EXISTING_ROUTE',
}

export const AllAppRoutes: AppRoutes[] = [
  AppRoutes.ORDERS,
  AppRoutes.USERS,
  AppRoutes.TRANSPORT_APPLICATIONS,
];
