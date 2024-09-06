import { applyDecorators, UseGuards, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';

export function Auth(...roles: string[]) {
  const hasRoles = roles.length > 0;

  return applyDecorators(
    SetMetadata('roles', hasRoles ? roles : null),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
