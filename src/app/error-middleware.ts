import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { history } from '../features/util/history';

export const serverErrorMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const status: number = action.payload.status;
    if (status === 500) {
      history.push('/server-error');
    }
  }

  return next(action);
};
