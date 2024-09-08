import {
  Controller,
  Post,
  Body,
  HttpCode,
  Get,
  UseGuards,
  SetMetadata,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { RawHeaders } from './decorators/raw-headers.decorators';
import { UserRoleGuard } from './guards/user-role.guard';
import { Auth } from './decorators/auth.decorator';
import { UserWithoutPassword } from './interfaces/user-no-password.interface';
import { Profession } from './entities';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //TODO create user
  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  //TODO login user
  @Post('login')
  @HttpCode(200)
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.createLogin(loginUserDto);
  }

  //* Endpoint para obtener usuarios por profesión
  @Get('profession/:professionName')
  findUsersByProfession(
    @Param('professionName') professionName: string,
  ): Promise<UserWithoutPassword[]> {
    return this.authService.findUsersByProfession(professionName);
  }

  //TODO  list of professions
  @Get('professions')
  findAllProfessions(): Promise<Profession[]> {
    return this.authService.findAllProfessions();
  }

  // ruta de prueba

  // @Get('private3')
  // @Auth()
  // privateRoute3(@GetUser() user: User) {
  //   return {
  //     message: 'Tiene acceso',
  //   };
  // }
}
