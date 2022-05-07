import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthenticationDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'email',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @ApiProperty({
    type: String,
    description: 'password',
  })
  password: string;
}
