import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  //TODO create user
  async create(createUserDto: CreateUserDto) {
    const { name } = createUserDto;
    try {
      const user = this.userRepository.create({
        ...createUserDto,
        name: name.toLowerCase().trim(),
      });
      await this.userRepository.save(user);
      return {
        ...user,
        token: this.getJWTtoken({
          email: user.email,
          name: user.name,
        } as JwtPayload),
      };
    } catch (error) {
      this.handleErrors(error);
    }
  }

  //TODO login user
  async createLogin(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true },
    });

    if (!user) {
      throw new UnauthorizedException(`Invalid credentials ${email}`);
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException(
        `Invalid credentials password does not match`,
      );
    }

    return {
      ...user,
      token: this.getJWTtoken({
        email: user.email,
        name: user.name,
      } as JwtPayload),
    };

    //* Todo retornar jwt
  }

  private getJWTtoken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private readonly handleErrors = (error: any): never => {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException();
  };
}
