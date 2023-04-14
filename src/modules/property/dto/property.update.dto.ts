import { Transform, TransformFnParams } from "class-transformer";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";

export class PropertyUpdateDto {
	@IsOptional()
	@IsString()
	@Transform(({ value }: TransformFnParams) => {
		if (value && typeof value == "string") {
			return value.trim();
		} else {
			return false;
		}
	})
	@Length(3, 45)
	name?: string;

	@IsOptional()
	@IsBoolean()
	is_private?: boolean;

	@IsOptional()
	@IsString()
	@Transform(({ value }: TransformFnParams) => {
		if (value && typeof value == "string") {
			return value.trim();
		} else {
			return false;
		}
	})
	@Length(10, 500)
	description?: string;
}
