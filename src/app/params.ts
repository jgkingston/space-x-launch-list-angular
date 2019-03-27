export type Orders = 'asc' | 'desc';

export class Params {
  limit: number;
  offset: number;
  order: Orders;
  sort: 'flight_number';
  [key: string]: string | number;
}
