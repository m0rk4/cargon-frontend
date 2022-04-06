import { apiSlice } from '../api/apiSlice';
import { TransportApplication } from './models/transport-application.interface';

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPendingTransportApplications: builder.query<
      TransportApplication[],
      void
    >({
      query: () => 'transport-application/pending',
      providesTags: (result = []) => [
        { type: 'TransportApplication' as const, id: 'LIST' },
        ...result.map(({ id }) => ({
          type: 'TransportApplication' as const,
          id,
        })),
      ],
    }),
    getTransportApplicationDocument: builder.query<string, string>({
      query: (documentUid) => ({
        url: `/transport-application/document?documentPublicId=${documentUid}`,
        responseHandler: (response) => response.text(),
      }),
    }),
    addTransportApplication: builder.mutation<
      TransportApplication,
      { driverId: number; publicId: string }
    >({
      query: (body) => ({
        url: '/transport-application',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: 'TransportApplication' as const, id: 'LIST' }],
    }),
    approveTransportApplication: builder.mutation<TransportApplication, number>(
      {
        query: (id) => ({
          url: `/transport-application/${id}/approve`,
          method: 'PUT',
        }),
        invalidatesTags: (result, error, arg) =>
          error ? [] : [{ type: 'TransportApplication' as const, id: arg }],
      },
    ),
    declineTransportApplication: builder.mutation<TransportApplication, number>(
      {
        query: (id) => ({
          url: `/transport-application/${id}/decline`,
          method: 'PUT',
        }),
        invalidatesTags: (result, error, arg) =>
          error ? [] : [{ type: 'TransportApplication' as const, id: arg }],
      },
    ),
  }),
});

export const {
  useGetPendingTransportApplicationsQuery,
  useApproveTransportApplicationMutation,
  useDeclineTransportApplicationMutation,
  useLazyGetTransportApplicationDocumentQuery,
  useAddTransportApplicationMutation,
} = extendedApiSlice;
