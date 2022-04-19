import { VehicleType } from './vehicle-type.enum';

export interface Vehicle {
  id: number;
  brand: string;
  model: string;
  registrationNumber: string;
  vehicleType: VehicleType;
  vin: string;
  yearOfProduction: string;
  insuranceExpiryTs: string;
}
