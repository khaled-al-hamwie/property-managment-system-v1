import { Transform, TransformFnParams } from "class-transformer";
import {
	IsEmail,
	IsOptional,
	IsPhoneNumber,
	IsString,
	IsUrl,
	Length,
	NotContains,
} from "class-validator";

export class RegisterUserDto {
	@IsEmail()
	email: string;

	@IsString()
	@Transform(({ value }: TransformFnParams) => {
		if (value && typeof value == "string") {
			return value.trim();
		}
	})
	@NotContains(" ", { message: "password should not contain a space" })
	@Length(20, 40)
	password: string;

	@IsString()
	@Transform(({ value }: TransformFnParams) => {
		if (value && typeof value == "string") {
			return value.trim();
		}
	})
	@NotContains(" ", { message: "user_name should not contain a space" })
	@Length(3, 45)
	user_name: string;

	@IsString()
	@Transform(({ value }: TransformFnParams) => {
		if (value && typeof value == "string") {
			return value.trim();
		}
	})
	@Length(3, 45)
	first_name: string;

	@IsString()
	@Transform(({ value }: TransformFnParams) => {
		if (value && typeof value == "string") {
			return value.trim();
		}
	})
	@Length(3, 45)
	last_name: string;

	@IsOptional()
	@IsString()
	@Transform(({ value }: TransformFnParams) => {
		if (value && typeof value == "string") {
			return value.trim();
		}
	})
	@Length(10, 245)
	bio?: string;

	@IsOptional()
	@IsEmail()
	contact_email?: string;

	@IsOptional()
	@IsPhoneNumber()
	phone_number?: string;

	@IsOptional()
	@IsUrl()
	image?: string;
}
