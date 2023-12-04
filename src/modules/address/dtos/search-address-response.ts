import { ApiProperty } from '@nestjs/swagger';

export class SearchAddressResponseDTO {
  @ApiProperty({
    name: 'city',
    example: 'Santo Andre - SP',
  })
  city: string;

  @ApiProperty({
    name: 'street',
    example: 'Rua Antonio Magalhaes',
  })
  street: string;

  @ApiProperty({
    name: 'zipCode',
    example: '09195070',
  })
  zipCode: string;
}
