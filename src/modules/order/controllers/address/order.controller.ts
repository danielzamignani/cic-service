import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderService } from '../../services/address/order.service';
import { UserGuard } from 'src/shared/guards/user.guard';

@ApiTags('order')
@Controller('order')
@UseGuards(UserGuard)
export class OrderController {
  constructor(private orderService: OrderService) {}
}
