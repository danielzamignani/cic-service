import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUUID, IsEmail, IsBoolean } from 'class-validator';

export class LoginUserResponseDTO {
  @ApiProperty({
    name: 'token',
    description: 'Token for authenticated routes',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    name: 'id',
    description: 'Id of the user',
    example: '',
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    name: 'name',
    description: 'Name of the user',
    example: 'Test Test',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    name: 'name',
    description: 'Email of the user',
    example: 'test@email.com.br',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    name: 'isAdmin',
    description: 'Indicates if user is admin',
    example: false,
    required: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  isAdmin: boolean;
}
