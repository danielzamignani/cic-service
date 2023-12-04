import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
import { CartItemDTO } from './cart-item.dto';
import { AddressDTO } from 'src/modules/address/dtos/address.dto';

export class CreateOrderRequestDTO {
  @ApiProperty({
    name: 'name',
    description: 'Name of order',
    example: 'Daniel Zamignani',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    name: 'totalPrice',
    description: 'Total price of order',
    example: 10.0,
    required: true,
  })
  @IsDecimal()
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @ApiProperty({
    name: 'address',
    description: 'Address of order',
    type: AddressDTO,
    required: true,
  })
  @IsObject()
  @IsNotEmpty()
  address: AddressDTO;

  @ApiProperty({
    name: 'items',
    description: 'Items of order',
    type: [CartItemDTO],
    required: true,
  })
  @IsArray()
  @IsNotEmpty()
  items: CartItemDTO[];
}
