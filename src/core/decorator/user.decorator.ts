import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserPayload } from "src/modules/auth/interfaces/payload.interface";
type userAttributes = "user_id" | "user_name" | "admin_id";
export const User = createParamDecorator(
	(data: userAttributes, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		const user: UserPayload = request.user;
		return data ? user?.[data] : user;
	}
);
