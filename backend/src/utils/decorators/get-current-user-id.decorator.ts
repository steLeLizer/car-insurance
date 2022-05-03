import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AccessTokenType } from '../../authentication/types';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as AccessTokenType;
    return user.sub;
  },
);
