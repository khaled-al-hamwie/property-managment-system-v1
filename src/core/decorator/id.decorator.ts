import {
	createParamDecorator,
	ExecutionContext,
	NotAcceptableException,
} from "@nestjs/common";
export const IdParam = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		const id = request.params.id;
		if (id <= 0) {
			throw new NotAcceptableException();
		}
		return id;
	}
);
