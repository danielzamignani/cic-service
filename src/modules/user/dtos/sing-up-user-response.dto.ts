import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsUUID, IsObject } from 'class-validator';

class UserDTO {
  @ApiProperty({
    name: 'id',
    description: 'Id of user',
    example: '856b07f3-ce3b-4af3-bcf3-88bf6b1ea98f',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;

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
} 

export class SignUpResponseDTO {
  @ApiProperty({
    name: 'user',
    type: UserDTO,
    required: true,
  })
  @IsObject()
  @IsNotEmpty()
  user: UserDTO;


  @ApiProperty({
    name: 'message',
    description: 'Message of success',
    example: 'User created!',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
