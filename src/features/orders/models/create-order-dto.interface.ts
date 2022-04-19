import { GeoLocation } from '../../locations/models/location.interface';
import { Cargo } from './cargo.interface';

export interface CreateOrderDto {
  toLocation: GeoLocation;
  fromLocation: GeoLocation;
  cargos: Cargo[];
}
