import { User } from '../users/models/user.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { AuthConstants } from './models/auth.constants.enum';
import { LoginResponse } from './models/login.response.interface';
import { getAuthInitialState } from '../util/auth';

export type AuthState = {
  user: User | null;
  token: string | null;
  issued: number | null;
  expiresIn: number | null;
  isTokenExpirationPopupVisible?: boolean;
};

const slice = createSlice({
  name: 'auth',
  initialState: getAuthInitialState,
  reducers: {
    triggerExpirationPopup(state, action: PayloadAction<boolean>) {
      state.isTokenExpirationPopupVisible = action.payload;
    },
    clearCredentials(state) {
      localStorage.removeItem(AuthConstants.AUTH_USER_KEY);
      localStorage.removeItem(AuthConstants.AUTH_TOKEN_KEY);
      localStorage.removeItem(AuthConstants.AUTH_EXPIRES_IN_KEY);
      localStorage.removeItem(AuthConstants.AUTH_ISSUED_KEY);
      state.user = null;
      state.token = null;
      state.issued = null;
      state.expiresIn = null;
    },
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

export const { setCredentials, triggerExpirationPopup, clearCredentials } =
  slice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsTokenExpirationPopupVisible = (state: RootState) =>
  state.auth.isTokenExpirationPopupVisible;

export default slice.reducer;
