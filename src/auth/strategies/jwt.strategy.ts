import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  //TODO validate jwt
  async validate(payload: JwtPayload): Promise<User> {
    const { email, name } = payload;

    const user = await this.userRepository.findOneBy({ email });

    // Verificar si el usuario fue encontrado o no

    if (!user) throw new UnauthorizedException(`Invalid credentials ${email}`);

    // Verificar si el usuario está activo
    if (!user.isActive) {
      throw new UnauthorizedException(`debe ser administrador`);
    }

    return user;
  }
}
