import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemController } from './controlles/item.controller';
import { ItemService } from './services/item.service';
import { UserEntity } from 'src/entities/user.entity';
import { VwItemEntity } from 'src/entities/vw-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VwItemEntity, UserEntity])],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
