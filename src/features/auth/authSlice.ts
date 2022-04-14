import { apiSlice } from '../api/apiSlice';
import { User } from '../users/models/user.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { AuthConstants } from './model/auth.constants.enum';
import { LoginResponse } from './model/login.response.interface';
import { LoginRequest } from './model/login.request.interface';
import { SignupRequest } from './model/signup.request.interface';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/signin',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<void, SignupRequest>({
      query: (body) => ({
        url: '/auth/signup',
        method: 'POST',
        body,
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
  localStorage.getItem(AuthConstants.AUTH_USER_KEY) &&
  !expired(
    +localStorage.getItem(AuthConstants.AUTH_ISSUED_KEY)!,
    +localStorage.getItem(AuthConstants.AUTH_EXPIRES_IN_KEY)!,
  );

const initialState: AuthState = {
  user: existsAndNotExpired
    ? (JSON.parse(localStorage.getItem(AuthConstants.AUTH_USER_KEY)!) as User)
    : null,
  token: existsAndNotExpired
    ? localStorage.getItem(AuthConstants.AUTH_TOKEN_KEY)
    : null,
  issued: existsAndNotExpired
    ? +localStorage.getItem(AuthConstants.AUTH_ISSUED_KEY)!
    : null,
  expiresIn: existsAndNotExpired
    ? +localStorage.getItem(AuthConstants.AUTH_EXPIRES_IN_KEY)!
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
      localStorage.setItem(AuthConstants.AUTH_USER_KEY, JSON.stringify(user));
      localStorage.setItem(AuthConstants.AUTH_TOKEN_KEY, accessToken);
      localStorage.setItem(AuthConstants.AUTH_ISSUED_KEY, String(issued));
      localStorage.setItem(
        AuthConstants.AUTH_EXPIRES_IN_KEY,
        String(expiresIn),
      );
      state.user = user;
      state.token = accessToken;
      state.issued = issued;
      state.expiresIn = expiresIn;
    },
  },
});

export const { setCredentials } = slice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const { useLoginMutation, useRegisterMutation } = extendedApiSlice;

export default slice.reducer;
