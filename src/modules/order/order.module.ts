import { Module } from '@nestjs/common';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { AddressEntity } from 'src/entities/address.entity';
import { OrderEntity } from 'src/entities/order.entity';
import { ItemEntity } from 'src/entities/item.entity';
import { ItemOrderEntity } from 'src/entities/item-order.entity';
import { AddressModule } from '../address/address.module';
import { PaymentEntity } from 'src/entities/payment.entity';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      AddressEntity,
      OrderEntity,
      ItemEntity,
      ItemOrderEntity,
      PaymentEntity,
    ]),
    JwtModule,
    AddressModule,
  ],
})
export class OrderModule {}
