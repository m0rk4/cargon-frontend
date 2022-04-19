import { GeoLocation } from '../../locations/models/location.interface';

export interface UpdateOrderLocations {
  orderId: string;
  fromLocation: GeoLocation;
  toLocation: GeoLocation;
}
