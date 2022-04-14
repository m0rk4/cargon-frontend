import { GeoLocation } from './location.interface';
import { Cargo } from './cargo.interface';

export interface CreateOrderDto {
  toLocation: GeoLocation;
  fromLocation: GeoLocation;
  cargos: Cargo[];
}
