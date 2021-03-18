import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  description: string;

  @IsInt()
  @IsPositive()
  price: number;
}
