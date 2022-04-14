import { AuthConstants } from '../auth/models/auth.constants.enum';
import { AuthState } from '../auth/authSlice';
import { User } from '../users/models/user.interface';

const isTimeExpired = (issued: number, expiresIn: number) =>
  Date.now() - issued > expiresIn;

const emptyAuthState: AuthState = {
  token: null,
  user: null,
  issued: null,
  expiresIn: null,
};

const getAuthInitialState = (): AuthState => {
  const issued = localStorage.getItem(AuthConstants.AUTH_ISSUED_KEY);
  const expiresIn = localStorage.getItem(AuthConstants.AUTH_EXPIRES_IN_KEY);
  const token = localStorage.getItem(AuthConstants.AUTH_TOKEN_KEY);
  const user = localStorage.getItem(AuthConstants.AUTH_USER_KEY);
  if (
    issued === null ||
    expiresIn === null ||
    token === null ||
    user === null
  ) {
    return emptyAuthState;
  }

  if (isTimeExpired(+issued, +expiresIn)) {
    return emptyAuthState;
  }

  return {
    token,
    user: JSON.parse(user) as User,
    issued: +issued,
    expiresIn: +expiresIn,
  };
};

export { isTimeExpired, getAuthInitialState, emptyAuthState };
