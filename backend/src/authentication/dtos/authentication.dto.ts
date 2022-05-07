import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthenticationDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    type: String,
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @ApiProperty({
    type: String,
  })
  password: string;
}
