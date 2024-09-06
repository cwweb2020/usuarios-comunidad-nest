import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

// Crear el decorador personalizado
export const RawHeaders = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    if (data) {
      return request.headers[data.toLowerCase()];
    }

    return request.headers;
  },
);
