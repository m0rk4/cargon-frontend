import { apiSlice } from '../api/apiSlice';
import { Order } from './models/order.interface';
import { CreateOrderDto } from './models/create-order-dto.interface';
import { BookOrderDto } from './models/book-order-dto.interface';
import { UpdateOrderCargos } from './models/update-order-cargos.interface';
import { UpdateOrderLocations } from './models/update-order-locations.interface';

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
    getUserOrders: builder.query<Order[], void>({
      query: () => `/order/user-orders`,
      providesTags: (result = []) => [
        { type: 'Order' as const, id: 'LIST' },
        ...result.map(({ id }) => ({
          type: 'Order' as const,
          id,
        })),
      ],
    }),
    getDriverOrders: builder.query<Order[], void>({
      query: () => `/order/driver-orders`,
      providesTags: (result = []) => [
        { type: 'Order' as const, id: 'LIST' },
        ...result.map(({ id }) => ({
          type: 'Order' as const,
          id,
        })),
      ],
    }),
    getOrder: builder.query<Order, number>({
      query: (id) => `/order/${id}`,
      providesTags: (result) =>
        result ? [{ type: 'Order' as const, id: result.id }] : [],
    }),
    updateOrderCargos: builder.mutation<Order, UpdateOrderCargos>({
      query: ({ orderId, cargos }) => ({
        url: `/order/${orderId}/cargos`,
        method: 'PUT',
        body: cargos,
      }),
      invalidatesTags: (result, error, { orderId }) =>
        error ? [] : [{ type: 'Order' as const, id: orderId }],
    }),
    updateOrderLocations: builder.mutation<Order, UpdateOrderLocations>({
      query: ({ orderId, fromLocation, toLocation }) => ({
        url: `/order/${orderId}/locations`,
        method: 'PUT',
        body: { fromLocation, toLocation },
      }),
      invalidatesTags: (result, error, { orderId }) =>
        error ? [] : [{ type: 'Order' as const, id: orderId }],
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
    releaseOrder: builder.mutation<Order, number>({
      query: (id) => ({
        url: `/order/${id}/release`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Order' as const, id: arg }],
    }),
    completeOrder: builder.mutation<Order, number>({
      query: (id) => ({
        url: `/order/${id}/release`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Order' as const, id: arg }],
    }),
    bookOrder: builder.mutation<Order, { dto: BookOrderDto; orderId: number }>({
      query: ({ orderId, dto }) => ({
        url: `/order/${orderId}/book`,
        method: 'PUT',
        body: dto,
      }),
      invalidatesTags: (result, error, { orderId }) =>
        error ? [] : [{ type: 'Order' as const, id: orderId }],
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
  useGetOrderQuery,
  useUpdateOrderCargosMutation,
  useUpdateOrderLocationsMutation,
  useGetApprovedOrdersQuery,
  useReleaseOrderMutation,
  useCompleteOrderMutation,
  useApproveOrderMutation,
  useDeclineOrderMutation,
  useBookOrderMutation,
  useCreateOrderMutation,
} = extendedApiSlice;
