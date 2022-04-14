import { apiSlice } from '../api/apiSlice';
import { User } from '../users/models/user.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const AUTH_USER_KEY = 'user';
const AUTH_TOKEN_KEY = 'token';
const AUTH_ISSUED_KEY = 'issued';
const AUTH_EXPIRES_IN_KEY = 'expiresIn';

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
  accessToken: string;
  expiresIn: number;
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
  issued: number | null;
  expiresIn: number | null;
};

//TODO: make it better (e.g. move to reusable service)
const expired = (issued: number, expiresIn: number): boolean =>
  Date.now() - issued > expiresIn;
const existsAndNotExpired =
  localStorage.getItem(AUTH_USER_KEY) &&
  !expired(
    +localStorage.getItem(AUTH_ISSUED_KEY)!,
    +localStorage.getItem(AUTH_EXPIRES_IN_KEY)!,
  );

const initialState: AuthState = {
  user: existsAndNotExpired
    ? (JSON.parse(localStorage.getItem(AUTH_USER_KEY)!) as User)
    : null,
  token: existsAndNotExpired ? localStorage.getItem(AUTH_TOKEN_KEY) : null,
  issued: existsAndNotExpired ? +localStorage.getItem(AUTH_ISSUED_KEY)! : null,
  expiresIn: existsAndNotExpired
    ? +localStorage.getItem(AUTH_EXPIRES_IN_KEY)!
    : null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, accessToken, expiresIn },
      }: PayloadAction<LoginResponse>,
    ) => {
      const issued = Date.now();
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
      localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
      localStorage.setItem(AUTH_ISSUED_KEY, String(issued));
      localStorage.setItem(AUTH_EXPIRES_IN_KEY, String(expiresIn));
      state.user = user;
      state.token = accessToken;
      state.issued = issued;
      state.expiresIn = expiresIn;
    },
  },
});

export const { setCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const { useLoginMutation } = extendedApiSlice;
