import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { PayloadAttributes } from "src/modules/auth/interfaces/payload.interface";
type userAttributes = "user_id" | "user_name";
export const User = createParamDecorator(
	(data: userAttributes, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		const user: PayloadAttributes = request.user;
		return data ? user?.[data] : user;
	}
);
