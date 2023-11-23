import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemController } from './controlles/item.controller';
import { ItemService } from './services/item.service';
import { ItemEntity } from 'src/entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity])],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
