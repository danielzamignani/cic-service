import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { LoginUserRequestDTO } from '../dtos/login-user-request.dto';
import { LoginUserResponseDTO } from '../dtos/login-user-response.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  @InjectRepository(UserEntity)
  private readonly userEntityRepository: Repository<UserEntity>;

  constructor(private jwtService: JwtService) {}

  async loginUser(
    LoginUserRequestDTO: LoginUserRequestDTO,
  ): Promise<LoginUserResponseDTO> {
    const user = await this.userEntityRepository.findOne({
      where: { email: LoginUserRequestDTO.email },
    });

    if (!user || user.password !== LoginUserRequestDTO.password)
      throw new UnauthorizedException('Incorrect email or password!');

    const payload = { sub: user.id, email: user.email };

    const jwt = await this.jwtService.signAsync(payload, {
      expiresIn: '8h',
      secret: 'ultraSecretSecret',
    });

    return {
      accessToken: jwt,
    };
  }
}
