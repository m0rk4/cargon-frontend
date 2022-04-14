import { apiSlice } from '../api/apiSlice';
import { Vehicle } from './models/vehicle.interface';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDriverVehicles: builder.query<Vehicle[], number>({
      query: (driverId) => `/vehicle/driver/${driverId}`,
      providesTags: (result = [], error, arg) =>
        error ? [] : result.map(({ id }) => ({ type: 'Vehicle' as const, id })),
    }),
  }),
});

export const { useLazyGetDriverVehiclesQuery } = extendedApiSlice;
