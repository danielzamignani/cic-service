import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemEntity } from 'src/entities/item.entity';
import { Repository } from 'typeorm';
import { GetAllItemsRespondeDTO } from '../dtos/get-all-items-response.dto';

@Injectable()
export class ItemService {
  @InjectRepository(ItemEntity)
  private readonly itemEntityRepository: Repository<ItemEntity>;

  constructor() {}

  async getAllItems(): Promise<GetAllItemsRespondeDTO[]> {
    const items: GetAllItemsRespondeDTO[] = await this.itemEntityRepository
      .createQueryBuilder('i')
      .select([
        'i.id AS id',
        'i.name AS name',
        'i.price AS price',
        'i.imageUrl AS imageUrl',
        `CASE WHEN iu."usersId" IS NOT NULL THEN TRUE ELSE FALSE END AS favorite`,
      ])
      .leftJoin(
        'items_users',
        'iu',
        `iu."itemsId" = i."id" AND iu."usersId" = :idusuario`,
        {
          idusuario: null,
        },
      )
      .getRawMany();

    return items;
  }
}
