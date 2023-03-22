import { Transform, TransformFnParams } from "class-transformer";
import {
	IsDecimal,
	IsInt,
	IsNumber,
	IsPositive,
	IsString,
	Length,
} from "class-validator";

export class PostCreateDto {
	@IsPositive()
	@IsInt()
	property_id: number;

	@IsString()
	@Transform(({ value }: TransformFnParams) => {
		if (value && typeof value == "string") {
			return value.trim();
		}
	})
	@Length(3, 45)
	title: string;

	@IsString()
	@Transform(({ value }: TransformFnParams) => {
		if (value && typeof value == "string") {
			return value.trim();
		}
	})
	@Length(10, 500)
	description: string;

	@IsPositive()
	@IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
	price: number;
}
