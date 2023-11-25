import { Controller, Get } from '@nestjs/common';
import { ItemService } from '../services/item.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { ICurrentUser } from 'src/shared/interfaces/current-user.interface';
import { GetItemResponseDTO } from '../dtos/get-item-response.dto';

@ApiTags('items')
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

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
