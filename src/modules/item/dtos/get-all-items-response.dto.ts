import { ApiProperty } from '@nestjs/swagger';

export class GetAllItemsRespondeDTO {
  @ApiProperty({
    name: 'id',
    example: 1,
  })
  id: number;

  @ApiProperty({
    name: 'name',
    example: 'Cappuccino',
  })
  name: string;

  @ApiProperty({
    name: 'price',
    example: 5.0,
  })
  price: number;

  @ApiProperty({
    name: 'imageUrl',
    example: 'https://www.image.com.br/image.jpg',
  })
  imageUrl: string;

  @ApiProperty({
    name: 'favorite',
    example: true,
  })
  favorite: boolean;

  @ApiProperty({
    name: 'rating',
    example: 5,
  })
  rating: number;
}
