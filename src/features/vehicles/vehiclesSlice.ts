import { apiSlice } from '../api/apiSlice';
import { Vehicle } from './models/vehicle.interface';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDriverVehicles: builder.query<Vehicle[], void>({
      query: () => `/vehicle/driver`,
      providesTags: (result = [], error) =>
        error ? [] : result.map(({ id }) => ({ type: 'Vehicle' as const, id })),
    }),
  }),
});

export const { useLazyGetDriverVehiclesQuery } = extendedApiSlice;
