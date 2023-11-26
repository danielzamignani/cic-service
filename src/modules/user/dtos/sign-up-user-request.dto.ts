import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class SignUpUserRequestDTO {
  @ApiProperty({
    name: 'name',
    description: 'Name of user',
    example: 'Test test',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    name: 'email',
    description: 'Email of user',
    example: 'email@email.com.br',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'password',
    description: 'Password of user',
    example: '12345678',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
