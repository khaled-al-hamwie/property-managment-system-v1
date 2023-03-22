import { Transform, TransformFnParams } from "class-transformer";
import {
	IsNumber,
	IsOptional,
	IsPositive,
	IsString,
	Length,
} from "class-validator";

export class PostUpdateDto {
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
	title: string;

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
	description: string;

	@IsOptional()
	@IsPositive()
	@IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
	price: number;
}
