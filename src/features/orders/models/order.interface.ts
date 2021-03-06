import { User } from '../../users/models/user.interface';
import { OrderStatus } from './order-status.interface';
import { GeoLocation } from '../../locations/models/location.interface';
import { Cargo } from './cargo.interface';

export interface Order {
  id: number;
  createdAt: string;
  updatedAt: string;
  user: User;
  driver?: User;
  fromLocation: GeoLocation;
  toLocation: GeoLocation;
  status: OrderStatus;
  cargos: Cargo[];
}
