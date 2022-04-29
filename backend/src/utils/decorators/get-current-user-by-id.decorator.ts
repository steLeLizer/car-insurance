import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUserById = createParamDecorator(
  (data: string | unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user?.sub;
  },
);
