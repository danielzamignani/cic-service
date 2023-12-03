import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { LoginUserRequestDTO } from '../dtos/login-user-request.dto';
import { LoginUserResponseDTO } from '../dtos/login-user-response.dto';
import { JwtService } from '@nestjs/jwt';
import { SignUpUserRequestDTO } from '../dtos/sign-up-user-request.dto';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';

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

    if (!user) {
      throw new UnauthorizedException('Incorrect email or password!');
    }

    const correctPassword = await bcrypt.compare(
      LoginUserRequestDTO.password,
      user?.password,
    );

    if (!correctPassword) {
      throw new UnauthorizedException('Incorrect email or password!');
    }

    const res = await this.gerenareteTokenResponse(user);

    return res;
  }

  async signUpUser(
    signUpUserRequestDTO: SignUpUserRequestDTO,
  ): Promise<LoginUserResponseDTO> {
    const userExists = await this.userEntityRepository.count({
      where: {
        email: signUpUserRequestDTO.email,
      },
    });

    if (userExists) {
      throw new UnprocessableEntityException('User alread exists!');
    }

    const salt = await bcrypt.genSalt(10);
    const cryptPassword = await bcrypt.hash(
      signUpUserRequestDTO.password,
      salt,
    );

    const user = new UserEntity();
    user.id = randomUUID();
    user.name = signUpUserRequestDTO.name;
    user.email = signUpUserRequestDTO.email;
    user.password = cryptPassword;

    await this.userEntityRepository.insert(user);

    const res = await this.gerenareteTokenResponse(user);

    return res;
  }

  async gerenareteTokenResponse(user: UserEntity) {
    const payload = { sub: user.id };

    const jwt = await this.jwtService.signAsync(payload, {
      expiresIn: '8h',
      secret: 'ultraSecretSecret',
    });

    return {
      token: jwt,
      email: user.email,
      name: user.name,
      id: user.id,
      isAdmin: false,
    };
  }

  async getFavoriteUserItems(userId: string): Promise<number[]> {
    const userFavoriteItems = await this.userEntityRepository
      .createQueryBuilder('u')
      .select(['iu.itemId AS "itemId"'])
      .innerJoin('items_users', 'iu', `iu."userId" =  u.id`)
      .where('u.id = :userId', { userId })
      .getRawMany();

    const favoriteUserItemsIds: number[] = userFavoriteItems.map(
      (userFavoriteItem) => userFavoriteItem.itemId,
    );

    return favoriteUserItemsIds;
  }
}
