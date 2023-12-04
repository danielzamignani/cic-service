import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateOrderResponseDTO {
  @ApiProperty({
    name: 'orderId',
    description: 'id of order',
    example: '',
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({
    name: 'message',
    description: 'Message of success',
    required: false,
  })
  @IsString()
  @IsOptional()
  message: string;
}
