import { Controller, Get } from '@nestjs/common';
import { ItemService } from '../services/item.service';
import { GetAllItemsRespondeDTO } from '../dtos/get-all-items-response.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { ICurrentUser } from 'src/shared/interfaces/current-user.interface';

@ApiTags('items')
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @ApiResponse({
    status: 200,
    type: GetAllItemsRespondeDTO,
    description: 'Return all items',
  })
  @Get()
  async getAllItems(
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<GetAllItemsRespondeDTO[]> {
    return this.itemService.getAllItems(currentUser);
  }
}
