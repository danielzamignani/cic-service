import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ICurrentUser } from 'src/shared/interfaces/current-user.interface';
import { UserEntity } from 'src/entities/user.entity';
import { VwItemEntity } from 'src/entities/vw-item.entity';
import { GetItemResponseDTO } from '../dtos/get-item-response.dto';
import { vwItemEntityToDtoMapper } from '../mappers/vwItem-entity-to-dto.mapper';
import { GetItemByQueryRequestDTO } from '../dtos/get-item-by-query-request.dto';
/**
 * Instalar redis
 */
@Injectable()
export class ItemService {
  @InjectRepository(VwItemEntity)
  private readonly vWItemsEntityRepository: Repository<VwItemEntity>;

  @InjectRepository(UserEntity)
  private readonly userEntityRepository: Repository<UserEntity>;

  constructor() {}

  async getItemById(
    itemId: number,
    currentUser: ICurrentUser,
  ): Promise<GetItemResponseDTO> {
    const item: VwItemEntity = await this.vWItemsEntityRepository.findOne({
      where: { id: itemId },
    });

    if (!item) throw new NotFoundException('Item not found!');

    let favoriteUserItemsIds: number[] = [];
    if (currentUser?.userId) {
      favoriteUserItemsIds = await this.getFavoriteUserItems(
        currentUser?.userId,
      );
    }

    const getItemResponseDTO: GetItemResponseDTO = vwItemEntityToDtoMapper(
      item,
      favoriteUserItemsIds,
    );

    return getItemResponseDTO;
  }

  async getItemByQuery(
    getItemByQueryRequestDTO: GetItemByQueryRequestDTO,
    currentUser: ICurrentUser,
  ): Promise<GetItemResponseDTO[]> {
    //REMOVER O LIKE
    const items: VwItemEntity[] = await this.vWItemsEntityRepository
      .createQueryBuilder('i')
      .where(
        `LOWER(unaccent(i.name)) LIKE LOWER(unaccent('%${getItemByQueryRequestDTO.name}%'))`,
      )
      .getMany();

    if (!items) throw new NotFoundException('Item not found!');

    let favoriteUserItemsIds: number[] = [];
    if (currentUser?.userId) {
      favoriteUserItemsIds = await this.getFavoriteUserItems(
        currentUser?.userId,
      );
    }

    const getItemResponseDTO: GetItemResponseDTO[] = items.map((item) =>
      vwItemEntityToDtoMapper(item, favoriteUserItemsIds),
    );

    return getItemResponseDTO;
  }

  async getAllItems(currentUser: ICurrentUser): Promise<GetItemResponseDTO[]> {
    const items: VwItemEntity[] = await this.vWItemsEntityRepository.find();

    if (!items) throw new NotFoundException('Items not found!');

    let favoriteUserItemsIds: number[] = [];
    if (currentUser?.userId) {
      favoriteUserItemsIds = await this.getFavoriteUserItems(
        currentUser?.userId,
      );
    }

    const getItemResponseDTO: GetItemResponseDTO[] = items.map((item) =>
      vwItemEntityToDtoMapper(item, favoriteUserItemsIds),
    );

    return getItemResponseDTO;
  }

  async getFavoriteUserItems(userId: string): Promise<number[]> {
    const userFavoriteItems = await this.userEntityRepository
      .createQueryBuilder('u')
      .select(['iu.itemId AS "itemId"'])
      .innerJoin('items_users', 'iu', `iu."userId" =  u.id`)
      .where('u.id = :userId', { userId })
      .getRawMany();

    const favoriteUserItemsIds: number[] = userFavoriteItems.map(
      (userFavoriteItem) => userFavoriteItem.itemId,
    );

    return favoriteUserItemsIds;
  }
}
