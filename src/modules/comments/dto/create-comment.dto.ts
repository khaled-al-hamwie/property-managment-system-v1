import { Transform, TransformFnParams } from "class-transformer";
import { IsString, Length } from "class-validator";

export class CreateCommentDto {
	@IsString()
	@Transform(({ value }: TransformFnParams) => {
		if (value && typeof value == "string") {
			return value.trim();
		}
		return false;
	})
	@Length(10, 500)
	description: string;
}
