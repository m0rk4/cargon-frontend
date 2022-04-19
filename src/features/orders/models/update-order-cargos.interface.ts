import { Cargo } from './cargo.interface';

export interface UpdateOrderCargos {
  orderId: string;
  cargos: Cargo[];
}
