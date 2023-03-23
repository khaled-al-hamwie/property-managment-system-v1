import {
	createParamDecorator,
	ExecutionContext,
	NotAcceptableException,
} from "@nestjs/common";
export const IdParam = createParamDecorator(
	(data: string, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		let id = request.params;
		if (data) id = id?.[data];
		else id = request.params.id;
		if (id <= 0) {
			throw new NotAcceptableException();
		}
		return id;
	}
);
