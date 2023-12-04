import { Module } from '@nestjs/common';
import { OrderController } from './controllers/address/order.controller';
import { OrderService } from './services/address/order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
