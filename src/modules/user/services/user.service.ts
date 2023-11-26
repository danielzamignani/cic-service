import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
/**
 * Instalar redis
 */
@Injectable()
export class UserService {
  @InjectRepository(UserEntity)
  private readonly userEntityRepository: Repository<UserEntity>;

  constructor() {}
  
}
