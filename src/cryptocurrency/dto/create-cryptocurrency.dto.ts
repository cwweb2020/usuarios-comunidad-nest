import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  Min,
} from 'class-validator';

export class CreateCryptocurrencyDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  ticker: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  precioCompra: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  cantidadComprada: number;
}
