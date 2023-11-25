import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity('vw_items')
export class VwItemEntity {
  @ViewColumn({
    name: 'id',
  })
  id: number;

  @ViewColumn({
    name: 'name',
  })
  name: string;

  @ViewColumn({
    name: 'price',
  })
  price: number;

  @ViewColumn({
    name: 'imageUrl',
  })
  imageUrl: string;

  @ViewColumn({
    name: 'stars',
  })
  stars: number;
}
