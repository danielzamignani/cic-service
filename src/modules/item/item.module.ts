import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemController } from './controlles/item.controller';
import { ItemService } from './services/item.service';
import { ItemEntity } from 'src/entities/item.entity';
import { UserEntity } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity, UserEntity])],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
