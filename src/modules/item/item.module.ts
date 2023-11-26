import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemController } from './controllers/item.controller';
import { ItemService } from './services/item.service';
import { UserEntity } from 'src/entities/user.entity';
import { VwItemEntity } from 'src/entities/vw-item.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([VwItemEntity, UserEntity]), UserModule],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
