import { Controller } from '@nestjs/common';
import { ItemService } from '../services/item.service';

@Controller()
export class ItemController {
  constructor(private readonly itemService: ItemService) {}
}
