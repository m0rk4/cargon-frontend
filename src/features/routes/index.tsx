import React, { VFC } from 'react';
import { ManagementRoutes } from './ManagementRoutes';
import { CustomerRoutes } from './CustomerRoutes';
import { DriverRoutes } from './DriverRoutes';

export const IndexRoutes: VFC = () => (
  <>
    <ManagementRoutes />
    <CustomerRoutes />
    <DriverRoutes />
  </>
);
