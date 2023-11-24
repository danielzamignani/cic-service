import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemEntity } from 'src/entities/item.entity';
import { Repository } from 'typeorm';
import { GetAllItemsRespondeDTO } from '../dtos/get-all-items-response.dto';
import { ICurrentUser } from 'src/shared/interfaces/current-user.interface';
import { ItemRatingEntity } from 'src/entities/item-rating.entity';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class ItemService {
  @InjectRepository(ItemEntity)
  private readonly itemEntityRepository: Repository<ItemEntity>;

  @InjectRepository(UserEntity)
  private readonly userEntityRepository: Repository<UserEntity>;

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
        'COALESCE(AVG(ir.stars), 0) AS rating'
      ])
      .leftJoin(
        ItemRatingEntity, 
        'ir', 
        'ir.itemId = i.id'
      )
      .groupBy('i.id')
      .orderBy('i.id', 'ASC')
      .getRawMany();


    if(currentUser?.userId) {
      const userFavoriteItems = await this.userEntityRepository
      .createQueryBuilder('u')
      .select(['iu.itemId AS "itemId"'])
      .innerJoin('items_users','iu',`iu."userId" =  u.id`)
      .where('u.id = :userId', {userId: currentUser?.userId})
      .getRawMany();

      const favoriteItemsIds: number[] = userFavoriteItems.map(userFavoriteItem => userFavoriteItem.itemId); 

      items.forEach(item => {
        if(favoriteItemsIds.includes(item.id) ) {
          item.favorite = true;
        } else {
          item.favorite = false;
        }
      });
    }

    return items;
  }
}
