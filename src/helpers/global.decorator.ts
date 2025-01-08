import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserRegisterSchema } from "src/models/user.model";

export const GetUser = createParamDecorator((data:unknown, context:ExecutionContext): UserRegisterSchema=>{
    const response = context.switchToHttp().getRequest();
    return response.user
})