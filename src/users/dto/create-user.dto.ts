import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'field needs to be a string' })
  @IsOptional()
  firstName: string;

  @IsString({ message: 'field needs to be a string' })
  @IsOptional()
  lastName: string;

  @IsEmail()
  @IsNotEmpty({ message: 'field is mandatory' })
  email: string;

  @MinLength(8, { message: 'Password have to be at leat 8 characters' })
  @IsNotEmpty({ message: 'field is mandatory' })
  password: string;
}
