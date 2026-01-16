export class CreateOrderDto {
  items: { item: string; qty: number; price: number }[];
  phone: string;
  location: string;
  total: number;
}
