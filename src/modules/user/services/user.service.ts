import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { LoginUserRequestDTO } from '../dtos/login-user-request.dto';
import { LoginUserResponseDTO } from '../dtos/login-user-response.dto';
import { JwtService } from '@nestjs/jwt';
import { SignUpUserRequestDTO } from '../dtos/sign-up-user-request.dto';
import {randomUUID} from 'crypto';
import * as bcrypt from 'bcrypt';
import { SignUpResponseDTO } from '../dtos/sing-up-user-response.dto';
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

  async signUpUser(signUpUserRequestDTO: SignUpUserRequestDTO): Promise<SignUpResponseDTO> {
    const userExists = await this.userEntityRepository.count({
      where: {
        email: signUpUserRequestDTO.email
      }
    });

    if(userExists) {
      throw new UnprocessableEntityException('User alread exists!');
    }

    const salt = await bcrypt.genSalt(10);
    const cryptPassword = await bcrypt.hash(signUpUserRequestDTO.password, salt);

    const userId = randomUUID();
    await this.userEntityRepository.insert({
      id: userId,
      name: signUpUserRequestDTO.name,
      password: cryptPassword,
      email: signUpUserRequestDTO.email
    });

    return {
      user: {
        id: userId,
        name: signUpUserRequestDTO.name,
        email: signUpUserRequestDTO.email
      },
      message: 'User created!'
    };
  }
}
