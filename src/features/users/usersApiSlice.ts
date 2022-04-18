import { apiSlice } from '../api/apiSlice';
import { User } from './models/user.interface';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => '/user',
      providesTags: (result = []) => [
        { type: 'User' as const, id: 'LIST' },
        ...result.map(({ id }) => ({
          type: 'User' as const,
          id,
        })),
      ],
    }),
    getUser: builder.query<User, number>({
      query: (id) => `/user/${id}`,
      providesTags: (result) =>
        result ? [{ type: 'User' as const, id: result.id }] : [],
    }),
    blockUser: builder.mutation<User, number>({
      query: (id) => ({
        url: `/user/${id}/block`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'User' as const, id: arg }],
    }),
    activateUser: builder.mutation<User, number>({
      query: (id) => ({
        url: `/user/${id}/activate`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'User' as const, id: arg }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useBlockUserMutation,
  useActivateUserMutation,
} = extendedApiSlice;
