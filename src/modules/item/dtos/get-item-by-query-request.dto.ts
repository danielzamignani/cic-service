import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetItemByQueryRequestDTO {
  @ApiProperty({
    name: 'name',
    description: 'Item name for search',
    example: 'Cappuccino',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;
}
