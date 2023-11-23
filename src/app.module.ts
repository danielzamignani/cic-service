import { Module } from '@nestjs/common';
import { dataSourceOptions } from './shared/infra/typeorm/ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from './modules/item/item.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), ItemModule],
})
export class AppModule {}
