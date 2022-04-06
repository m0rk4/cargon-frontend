import { User } from '../../../pages/users/managemnt/models/user.interface';

export interface TransportApplication {
  id: number;
  driver: User;
  documentPublicId: string;
  createdAt: string;
}
