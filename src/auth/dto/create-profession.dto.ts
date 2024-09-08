import { IsString, Length } from 'class-validator';

export class CreateProfessionDto {
  @IsString()
  @Length(3, 50)
  professionName: string;
}
