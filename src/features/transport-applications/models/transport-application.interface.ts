import { User } from '../../users/models/user.interface';

export interface TransportApplication {
  id: number;
  driver: User;
  documentPublicId: string;
  createdAt: string;
}
