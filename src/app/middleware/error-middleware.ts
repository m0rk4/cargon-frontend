import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { history } from '../../features/util/history';
import { AppRoutes } from '../../features/routes/models/routes.enum';

export const serverErrorMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const status: number = action.payload.status;
    if (status === 500) {
      history.push(`/${AppRoutes.SERVER_ERROR}`);
    }
  }

  return next(action);
};
