import { Transform, TransformFnParams } from "class-transformer";
import {
	IsBoolean,
	IsInt,
	IsNumber,
	isNumber,
	IsOptional,
	IsString,
	IsUrl,
	Length,
} from "class-validator";

export class PropertyDto {
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
	is_private: boolean;

	@IsOptional()
	@IsString()
	@Transform(({ value }: TransformFnParams) => {
		if (value && typeof value == "string") {
			return value.trim();
		}
	})
	@Length(10, 500)
	description?: string;

	images?: string[];

	@IsInt()
	country_id: number;

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
