import { apiSlice } from '../api/apiSlice';
import { User } from '../users/models/user.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const USER_KEY = 'user';
const TOKEN_KEY = 'token';

export interface LoginErrorResponse {
  data: {
    statusCode: number;
    message: string;
    error: string;
  };
  status: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  access_token: string;
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/signin',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

type AuthState = {
  user: User | null;
  token: string | null;
};

const user = localStorage.getItem(USER_KEY);

const initialState: AuthState = {
  user: user ? (JSON.parse(user) as User) : null,
  token: localStorage.getItem(TOKEN_KEY),
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, access_token } }: PayloadAction<LoginResponse>,
    ) => {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      localStorage.setItem(TOKEN_KEY, access_token);
      state.user = user;
      state.token = access_token;
    },
  },
});

export const { setCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const { useLoginMutation } = extendedApiSlice;
