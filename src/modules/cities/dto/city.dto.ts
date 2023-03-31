import { Transform, TransformFnParams } from "class-transformer";
import { IsOptional, IsString, Length } from "class-validator";

export class CityDto {
	@IsString()
	@Transform(({ value }: TransformFnParams) => {
		if (value && typeof value == "string") {
			return value.trim();
		}
	})
	@Length(3, 45)
	name: string;

	@IsOptional()
	@IsString()
	@Transform(({ value }: TransformFnParams) => {
		if (value && typeof value == "string") {
			return value.trim();
		}
		return false;
	})
	@Length(3, 45)
	state?: string;
}
