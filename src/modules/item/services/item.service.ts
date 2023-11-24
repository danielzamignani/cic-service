import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemEntity } from 'src/entities/item.entity';
import { Repository } from 'typeorm';
import { GetAllItemsRespondeDTO } from '../dtos/get-all-items-response.dto';
import { ICurrentUser } from 'src/shared/interfaces/current-user.interface';

@Injectable()
export class ItemService {
  @InjectRepository(ItemEntity)
  private readonly itemEntityRepository: Repository<ItemEntity>;

  constructor() {}

  async getAllItems(
    currentUser: ICurrentUser,
  ): Promise<GetAllItemsRespondeDTO[]> {
    const items: GetAllItemsRespondeDTO[] = await this.itemEntityRepository
      .createQueryBuilder('i')
      .select([
        'i.id AS id',
        'i.name AS name',
        'i.price AS price',
        'i.imageUrl AS imageUrl',
        `CASE WHEN iu."userId" IS NOT NULL THEN TRUE ELSE FALSE END AS favorite`,
      ])
      .leftJoin(
        'items_users',
        'iu',
        `iu."itemId" = i."id" AND iu."userId" = :userId`,
        {
          userId: currentUser?.userId || null,
        },
      )
      .getRawMany();

    return items;
  }
}
