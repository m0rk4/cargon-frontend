import { apiSlice } from '../api/apiSlice';
import { DriverApplication } from '../users/models/driver-application.interface';
import { CreateDriverApplicationDto } from './models/create-driver-application-dto.interface';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPendingDriverApplications: builder.query<DriverApplication[], void>({
      query: () => '/driver-application/pending',
      providesTags: (result = []) => [
        { type: 'DriverApplication' as const, id: 'LIST' },
        ...result.map(({ id }) => ({
          type: 'DriverApplication' as const,
          id,
        })),
      ],
    }),
    declineDriverApplication: builder.mutation<DriverApplication, number>({
      query: (id) => ({
        url: `/driver-application/${id}/decline`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'DriverApplication' as const, id: arg }],
    }),
    approveDriverApplication: builder.mutation<DriverApplication, number>({
      query: (id) => ({
        url: `/driver-application/${id}/approve`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'DriverApplication' as const, id: arg }],
    }),
    createDriverApplication: builder.mutation<
      DriverApplication,
      CreateDriverApplicationDto
    >({
      query: (body) => ({
        url: `/driver-application`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : [{ type: 'DriverApplication' as const, id: result?.id }],
    }),
  }),
});

export const {
  useGetPendingDriverApplicationsQuery,
  useDeclineDriverApplicationMutation,
  useApproveDriverApplicationMutation,
  useCreateDriverApplicationMutation,
} = extendedApiSlice;
