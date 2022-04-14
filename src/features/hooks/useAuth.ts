import { useAppSelector } from './store';
import { useMemo } from 'react';
import { selectCurrentUser } from '../auth/authSlice';

export const useAuth = () => {
  const user = useAppSelector(selectCurrentUser);

  return useMemo(() => ({ user }), [user]);
};
