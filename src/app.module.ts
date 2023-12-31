import { Module } from '@nestjs/common';
import { dataSourceOptions } from './shared/infra/typeorm/ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from './modules/item/item.module';
import { UserModule } from './modules/user/user.module';
import { AddressModule } from './modules/address/address.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ItemModule,
    UserModule,
    AddressModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
