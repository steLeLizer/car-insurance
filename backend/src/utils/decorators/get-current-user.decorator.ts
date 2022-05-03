import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RefreshTokenType } from '../../authentication/types';

export const GetCurrentUser = createParamDecorator(
  (data: keyof RefreshTokenType | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
  },
);
