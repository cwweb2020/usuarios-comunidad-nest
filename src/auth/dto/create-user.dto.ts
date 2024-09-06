import {
  IsString,
  IsEmail,
  MinLength,
  IsNotEmpty,
  IsBoolean,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;
}
