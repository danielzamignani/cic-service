import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { ItemController } from './controlles/item.controller';
import { ItemService } from './services/item.service';


@Module({
  imports: [
    TypeOrmModule.forFeature(
            [
                UserEntity
            ]
        )
    ],
    controllers: [ ItemController ],
    providers: [ ItemService ]
})
export class ItemModule {}
