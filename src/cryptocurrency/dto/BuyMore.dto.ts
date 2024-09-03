import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class BuyMoreDto {
  @IsString()
  @IsNotEmpty()
  ticker: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  amount: number;
}
