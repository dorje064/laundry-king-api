import { ApiProperty } from '@nestjs/swagger';

class OrderItemDto {
  @ApiProperty()
  item: string;

  @ApiProperty()
  qty: number;

  @ApiProperty()
  price: number;
}

export class CreateOrderDto {
  @ApiProperty({ type: [OrderItemDto] })
  items: OrderItemDto[];

  @ApiProperty()
  phone: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  total: number;
}
