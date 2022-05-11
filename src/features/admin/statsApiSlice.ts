import { apiSlice } from '../api/apiSlice';

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReport: builder.query<
      Blob,
      { documentType: string; documentFormat: string }
    >({
      query: (query) => ({
        url: `/report/${query.documentType}/${query.documentFormat}`,
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const { useLazyGetReportQuery } = extendedApiSlice;
