import { Transform, TransformFnParams } from "class-transformer";
import { IsString, Length } from "class-validator";

export default class PropertyTypeDto {
	@IsString()
	@Transform(({ value }: TransformFnParams) => {
		if (value && typeof value == "string") {
			return value.trim();
		}
	})
	@Length(3, 45)
	name: string;
}
