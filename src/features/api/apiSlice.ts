import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TransportApplication } from '../transport-applications/models/transport-application.interface';
import { RootState } from '../../app/store';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    'TransportApplication',
    'Order',
    'Street',
    'City',
    'User',
    'DriverApplication',
    'Vehicle',
  ],
  endpoints: () => ({}),
});
