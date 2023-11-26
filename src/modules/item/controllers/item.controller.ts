import { Controller, Get, Param, Query } from '@nestjs/common';
import { ItemService } from '../services/item.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { ICurrentUser } from 'src/shared/interfaces/current-user.interface';
import { GetItemResponseDTO } from '../dtos/get-item-response.dto';
import { GetItemByQueryRequestDTO } from '../dtos/get-item-by-query-request.dto';

@ApiTags('items')
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @ApiResponse({
    status: 200,
    type: [GetItemResponseDTO],
    description: 'Return item by query',
  })
  @Get('/search')
  async getItemByQuery(
    @Query() getItemByQueryRequestDTO: GetItemByQueryRequestDTO,
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<GetItemResponseDTO[]> {
    return this.itemService.getItemByQuery(
      getItemByQueryRequestDTO,
      currentUser,
    );
  }

  @ApiResponse({
    status: 200,
    type: GetItemResponseDTO,
    description: 'Return item by id',
  })
  @Get('/:itemId')
  async getItemById(
    @Param('itemId') itemId: number,
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<GetItemResponseDTO> {
    return this.itemService.getItemById(itemId, currentUser);
  }

  @ApiResponse({
    status: 200,
    type: [GetItemResponseDTO],
    description: 'Return all items',
  })
  @Get()
  async getAllItems(
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<GetItemResponseDTO[]> {
    return this.itemService.getAllItems(currentUser);
  }
}
