import { IsInt, IsNotEmpty, IsString, IsPositive } from 'class-validator';

export class UpdateItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  description: string;

  @IsInt()
  @IsPositive()
  price: number;
}
