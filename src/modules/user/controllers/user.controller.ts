import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { LoginUserRequestDTO } from '../dtos/login-user-request.dto';
import { LoginUserResponseDTO } from '../dtos/login-user-response.dto';
import { SignUpUserRequestDTO } from '../dtos/sign-up-user-request.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    status: 200,
    type: LoginUserResponseDTO,
    description: 'Returns JWT',
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedException,
  })
  @Post('/login')
  async loginUser(@Body() LoginUserRequestDTO: LoginUserRequestDTO) {
    return await this.userService.loginUser(LoginUserRequestDTO);
  }

  @ApiResponse({
    status: 200,
    type: LoginUserResponseDTO,
    description: 'Returns JWT',
  })
  @ApiUnprocessableEntityResponse({
    type: UnprocessableEntityException,
  })
  @Post('/signup')
  async signUpUser(
    @Body() signUpUserRequestDTO: SignUpUserRequestDTO,
  ): Promise<LoginUserResponseDTO> {
    return await this.userService.signUpUser(signUpUserRequestDTO);
  }
}
