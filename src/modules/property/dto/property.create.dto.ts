import { Transform, TransformFnParams } from "class-transformer";
import {
	IsBoolean,
	IsInt,
	IsOptional,
	IsPositive,
	IsString,
	IsUrl,
	Length,
} from "class-validator";

export class PropertyCreateDto {
	@Transform(({ value }: TransformFnParams) => {
		return Number(value);
	})
	@IsPositive()
	@IsInt()
	property_type_id: number;

	@IsString()
	@Transform(({ value }: TransformFnParams) => {
		if (value && typeof value == "string") {
			return value.trim();
		}
	})
	@Length(3, 45)
	name: string;

	@IsOptional()
	@IsBoolean()
	is_private?: boolean;

	@IsOptional()
	@IsString()
	@Transform(({ value }: TransformFnParams) => {
		if (value && typeof value == "string") {
			return value.trim();
		}
		return false;
	})
	@Length(10, 500)
	description?: string;

	@Transform(({ value }: TransformFnParams) => {
		return Number(value);
	})
	@IsPositive()
	@IsInt()
	country_id: number;

	@Transform(({ value }: TransformFnParams) => {
		return Number(value);
	})
	@IsPositive()
	@IsInt()
	city_id: number;

	@IsString()
	@Transform(({ value }: TransformFnParams) => {
		if (value && typeof value == "string") {
			return value.trim();
		}
	})
	@Length(3, 45)
	place: string;

	@IsOptional()
	@IsUrl()
	google_map_link?: string;
}
