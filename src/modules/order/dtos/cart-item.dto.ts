import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsNumber, IsObject } from 'class-validator';
import { ItemEntity } from 'src/entities/item.entity';

export class CartItemDTO {
  @ApiProperty({
    name: 'quantity',
    description: 'Quantity of items',
    example: 3,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    name: 'price',
    description: 'Total price of item',
    example: 10.0,
    required: true,
  })
  @IsDecimal()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    name: 'item',
    description: 'Item of order',
    type: ItemEntity,
    required: true,
  })
  @IsObject()
  @IsNotEmpty()
  item: ItemEntity;
}
