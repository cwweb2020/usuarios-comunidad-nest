import {
  IsString,
  IsEmail,
  IsBoolean,
  IsArray,
  IsInt,
  Min,
  Max,
  IsOptional,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string; // Nombre

  @IsString()
  lastName: string; // Apellido

  @IsEmail()
  @IsNotEmpty()
  email: string; // Email

  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  password: string; // Contraseña

  @IsArray()
  @IsString({ each: true })
  profession: string[]; // Array de profesiones

  @IsInt()
  @Min(1)
  @Max(99)
  age: number;

  @IsArray()
  @IsString({ each: true }) // Cada idioma en el array debe ser un string
  languages: string[]; // Idiomas

  @IsString()
  phone: string; // Teléfono

  @IsOptional() // Opcional, si no se pasa se utiliza el valor por defecto en la entidad
  @IsBoolean()
  isActive?: boolean; // Estado activo (opcional)

  @IsString()
  location: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  roles?: string[];
}
