import { Transform, TransformFnParams } from "class-transformer";
import {
	IsInt,
	IsOptional,
	IsPositive,
	IsString,
	Length,
} from "class-validator";

export class CityDto {
	@IsPositive()
	@IsInt()
	country_id: number;

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
