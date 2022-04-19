import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { TransportApplication } from '../transport-applications/models/transport-application.interface';
import { RootState } from '../../app/store';
import { triggerExpirationPopup } from '../auth/authSlice';
import { LoginResponse } from '../auth/models/login.response.interface';
import { LoginRequest } from '../auth/models/login.request.interface';
import { SignupRequest } from '../auth/models/signup.request.interface';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithTokenExpirationHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401 && (args as FetchArgs).url !== '/auth/signin') {
    api.dispatch(triggerExpirationPopup(true));
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithTokenExpirationHandling,
  tagTypes: [
    'TransportApplication',
    'Order',
    'Street',
    'City',
    'User',
    'DriverApplication',
    'Vehicle',
  ],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/signin',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<void, SignupRequest>({
      query: (body) => ({
        url: '/auth/signup',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = apiSlice;
