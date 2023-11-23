import { Controller, Get } from '@nestjs/common';
import { ItemService } from '../services/item.service';
import { GetAllItemsRespondeDTO } from '../dtos/get-all-items-response.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

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
  async getAllItems(): Promise<GetAllItemsRespondeDTO[]> {
    return this.itemService.getAllItems();
  }
}
