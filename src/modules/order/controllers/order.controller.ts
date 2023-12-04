import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderService } from '../services/order.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { CreateOrderRequestDTO } from '../dtos/create-order-request.dto';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { ICurrentUser } from 'src/shared/interfaces/current-user.interface';
import { OrderEntity } from 'src/entities/order.entity';
import { CreateOrderResponseDTO } from '../dtos/create-order-response.dto';

@ApiTags('order')
@Controller('order')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class OrderController {
  constructor(private orderService: OrderService) {}

  @ApiResponse({
    status: 201,
    type: CreateOrderResponseDTO,
    description: 'Create an order',
  })
  @Post()
  async createOrder(
    @CurrentUser() currentUser: ICurrentUser,
    @Body() createOrderRequestDTO: CreateOrderRequestDTO,
  ): Promise<CreateOrderResponseDTO> {
    return await this.orderService.createOrder(
      createOrderRequestDTO,
      currentUser,
    );
  }

  @ApiResponse({
    status: 200,
    type: OrderEntity,
    description: 'Get an order',
  })
  @Get('/:orderId')
  async getOrderById(
    @CurrentUser() currentUser: ICurrentUser,
    @Param('orderId') orderId: string
  ): Promise<OrderEntity> {
    return await this.orderService.getOrderById(orderId, currentUser);
  }
}
