import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICurrentUser } from 'src/shared/interfaces/current-user.interface';
import { VwItemEntity } from 'src/entities/vw-item.entity';
import { GetItemResponseDTO } from '../dtos/get-item-response.dto';
import { vwItemEntityToDtoMapper } from '../mappers/vwItem-entity-to-dto.mapper';
import { GetItemByQueryRequestDTO } from '../dtos/get-item-by-query-request.dto';
import { UserService } from 'src/modules/user/services/user.service';
/**
 * Instalar redis
 */
@Injectable()
export class ItemService {
  @InjectRepository(VwItemEntity)
  private readonly vWItemsEntityRepository: Repository<VwItemEntity>;

  constructor(private userService: UserService) {}

  async getItemById(
    itemId: number,
    currentUser: ICurrentUser,
  ): Promise<GetItemResponseDTO> {
    const item: VwItemEntity = await this.vWItemsEntityRepository.findOne({
      where: { id: itemId },
    });

    if (!item) throw new NotFoundException('Item not found!');

    let favoriteUserItemsIds: number[] = [];
    if (currentUser?.sub) {
      favoriteUserItemsIds = await this.userService.getFavoriteUserItems(
        currentUser?.sub,
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
    if (currentUser?.sub) {
      favoriteUserItemsIds = await this.userService.getFavoriteUserItems(
        currentUser?.sub,
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
    if (currentUser?.sub) {
      favoriteUserItemsIds = await this.userService.getFavoriteUserItems(
        currentUser?.sub,
      );
    }

    const getItemResponseDTO: GetItemResponseDTO[] = items.map((item) =>
      vwItemEntityToDtoMapper(item, favoriteUserItemsIds),
    );

    return getItemResponseDTO;
  }
}
