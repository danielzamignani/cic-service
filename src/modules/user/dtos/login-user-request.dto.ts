import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserRequestDTO {
  @ApiProperty({
    name: 'email',
    description: 'Email for login',
    example: 'email@email.com.br',
    required: true,
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    name: 'password',
    description: 'Password for login',
    example: '12345678',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
