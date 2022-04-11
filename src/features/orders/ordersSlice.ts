import { apiSlice } from '../api/apiSlice';
import { Order } from './models/order.interface';
import { CreateOrderDto } from './models/create-order-dto.interface';

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPendingOrders: builder.query<Order[], void>({
      query: () => '/order/pending',
      providesTags: (result = []) => [
        { type: 'Order' as const, id: 'LIST' },
        ...result.map(({ id }) => ({
          type: 'Order' as const,
          id,
        })),
      ],
    }),
    getApprovedOrders: builder.query<Order[], void>({
      query: () => '/order/approved',
      providesTags: (result = []) => [
        { type: 'Order' as const, id: 'LIST' },
        ...result.map(({ id }) => ({
          type: 'Order' as const,
          id,
        })),
      ],
    }),
    getUserOrders: builder.query<Order[], number>({
      query: (id) => `/order/user-orders/${id}`,
      providesTags: (result = []) => [
        { type: 'Order' as const, id: 'LIST' },
        ...result.map(({ id }) => ({
          type: 'Order' as const,
          id,
        })),
      ],
    }),
    getDriverOrders: builder.query<Order[], number>({
      query: (id) => `/order/driver-orders/${id}`,
      providesTags: (result = []) => [
        { type: 'Order' as const, id: 'LIST' },
        ...result.map(({ id }) => ({
          type: 'Order' as const,
          id,
        })),
      ],
    }),
    approveOrder: builder.mutation<Order, number>({
      query: (id) => ({
        url: `/order/${id}/approve`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Order' as const, id: arg }],
    }),
    declineOrder: builder.mutation<Order, number>({
      query: (id) => ({
        url: `/order/${id}/decline`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Order' as const, id: arg }],
    }),
    createOrder: builder.mutation<Order, CreateOrderDto>({
      query: (order) => ({
        url: '/order',
        method: 'POST',
        body: order,
      }),
      invalidatesTags: (result, error) =>
        error
          ? []
          : [
              { type: 'Order' as const, id: 'LIST' },
              { type: 'Street' as const },
              { type: 'City' as const },
            ],
    }),
  }),
});

export const {
  useGetPendingOrdersQuery,
  useGetUserOrdersQuery,
  useGetDriverOrdersQuery,
  useGetApprovedOrdersQuery,
  useApproveOrderMutation,
  useDeclineOrderMutation,
  useCreateOrderMutation,
} = extendedApiSlice;
