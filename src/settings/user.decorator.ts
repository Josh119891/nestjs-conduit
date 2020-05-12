
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
//todo
export const User = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return data ? req.user[data] : req.user;
  },
);