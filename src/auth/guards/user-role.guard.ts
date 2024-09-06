import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Obtener los roles permitidos desde el metadata
    const validRoles: string[] = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    // Si no hay roles definidos, permitir acceso
    if (!validRoles) {
      return true;
    }

    // Obtener el objeto de la solicitud (request)
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Si no hay usuario, denegar acceso
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Verificar si el usuario tiene al menos uno de los roles válidos
    const hasRole = user.roles.some((role: string) =>
      validRoles.includes(role),
    );

    if (!hasRole) {
      throw new ForbiddenException(
        `User must have one of the following roles: ${validRoles.join(' or ')}`,
      );
    }

    return true;
  }
}
