import { Module } from '@nestjs/common';
import { AddressController } from './controllers/address/address.controller';
import { AddressService } from './services/address/address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from 'src/entities/address.entity';

@Module({
  controllers: [AddressController],
  providers: [AddressService],
  imports: [TypeOrmModule.forFeature([AddressEntity])],
  exports: [AddressService],
})
export class AddressModule {}
