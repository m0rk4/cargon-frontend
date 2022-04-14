export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  updatedAt: string;
  userRating: string;
  role: UserRole;
}

export enum UserRole {
  DRIVER = 'DRIVER',
  CUSTOMER = 'CUSTOMER',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
}
