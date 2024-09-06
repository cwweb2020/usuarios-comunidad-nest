import {
  Controller,
  Post,
  Body,
  HttpCode,
  Get,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { RawHeaders } from './decorators/raw-headers.decorators';
import { UserRoleGuard } from './guards/user-role.guard';
import { Auth } from './decorators/auth.decorator';

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

  //* ruta de prueba

  // @Get('private')
  // @UseGuards(AuthGuard())
  // testingPrivateRoute(
  //   @GetUser('email') userEmail: string,
  //   @RawHeaders() headers: string,
  // ) {
  //   return { userEmail, headers };
  // }

  // @Get('private2')
  // @SetMetadata('roles', ['admin'])
  // @UseGuards(AuthGuard(), UserRoleGuard)
  // privateRoute2(@GetUser() user: User) {
  //   return {
  //     message: 'Tiene acceso',
  //   };
  // }

  // @Get('private3')
  // @Auth()
  // privateRoute3(@GetUser() user: User) {
  //   return {
  //     message: 'Tiene acceso',
  //   };
  // }
}
