import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddressDTO {
  @ApiProperty({
    name: 'city',
    example: 'Santo Andre - SP',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    name: 'street',
    example: 'Rua Antonio Magalhaes',
  })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({
    name: 'zipCode',
    example: '09195070',
  })
  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @ApiProperty({
    name: 'number',
    example: '123',
    required: false,
  })
  @IsString()
  @IsOptional()
  number: string;

  @ApiProperty({
    name: 'complement',
    example: 'ap 1',
    required: false,
  })
  @IsString()
  @IsOptional()
  complement?: string;
}
