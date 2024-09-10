import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Profession } from './entities';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload, UserWithoutPassword } from './interfaces';
import { CreateProfessionDto } from './dto/create-profession.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Profession)
    private readonly professionRepository: Repository<Profession>,

    private readonly jwtService: JwtService,
  ) {}

  //TODO create user
  async create(createUserDto: CreateUserDto): Promise<any> {
    const { profession, roles } = createUserDto;

    try {
      // 1. Verificar si las profesiones ya existen
      const professions = await Promise.all(
        profession.map(async (professionName) => {
          let existingProfession = await this.professionRepository.findOne({
            where: { professionName: professionName.toLowerCase() },
          });

          if (!existingProfession) {
            const newProfession = new CreateProfessionDto();
            newProfession.professionName = professionName.toLowerCase();
            existingProfession =
              this.professionRepository.create(newProfession);
            await this.professionRepository.save(existingProfession);
          }

          return existingProfession;
        }),
      );

      // 2. Crear el nuevo usuario usando el DTO
      const newUser = this.userRepository.create({
        ...createUserDto,
        professions, // Asociar las profesiones
        roles: roles || ['user'], // Si no se proporcionan roles, por defecto 'user'
      });

      // Guardar el nuevo usuario en la base de datos
      await this.userRepository.save(newUser);

      // 3. Generar el token JWT
      const token = this.getJWTtoken({
        email: newUser.email,
        name: newUser.firstName, // Se puede ajustar si necesitas otros campos
      } as JwtPayload);

      // 4. Devolver el usuario y el token
      return {
        ...newUser,
        token, // Incluimos el token JWT en la respuesta
      };
    } catch (error) {
      this.handleErrors(error);
    }
  }

  //TODO login user
  async createLogin(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    // 1. Buscar el usuario por email
    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        email: true,
        password: true,
        firstName: true,
        roles: true,
        id: true,
      }, // Seleccionamos los campos necesarios
    });

    // 2. Verificar si el usuario existe
    if (!user) {
      throw new UnauthorizedException(`Invalid credentials: ${email}`);
    }

    // 3. Verificar si la contraseña es correcta
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Invalid credentials: password does not match',
      );
    }

    // 4. Generar el token JWT
    const token = this.getJWTtoken({
      email: user.email,
      name: user.firstName,
      id: user.id,
      roles: user.roles,
    } as JwtPayload);

    // 5. Retornar el usuario y el token
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      roles: user.roles,
      token, // Token JWT
    };
  }

  //TODO find users by profession
  async findUsersByProfession(
    professionName: string,
  ): Promise<UserWithoutPassword[]> {
    // 1. Buscar la profesión por nombre
    const profession = await this.professionRepository.findOne({
      where: { professionName: professionName.toLowerCase() },
      relations: ['users'], // Incluir los usuarios relacionados con esta profesión
    });

    if (!profession) {
      throw new NotFoundException(`Profession "${professionName}" not found`);
    }

    // 3. Excluir la contraseña de los usuarios
    const usersWithoutPassword: UserWithoutPassword[] = profession.users.map(
      (user) => {
        const { password, ...userWithoutPassword } = user; // Excluir la contraseña
        return userWithoutPassword;
      },
    );
    return usersWithoutPassword;
  }

  //TODO list of professions
  async findAllProfessions(): Promise<Profession[]> {
    return this.professionRepository.find({
      order: {
        professionName: 'ASC',
      },
    });
  }

  //TODO list of users
  async findAllUsers(): Promise<UserWithoutPassword[]> {
    const user = await this.userRepository.find();
    return user.map(
      ({ password, ...userWithoutPassword }) => userWithoutPassword,
    );
  }

  //TODO get jwt token
  private getJWTtoken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  //TODO handle errors function
  private readonly handleErrors = (error: any): never => {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException();
  };
}
