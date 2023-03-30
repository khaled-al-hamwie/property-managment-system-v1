import { OmitType } from "@nestjs/mapped-types";
import { IsEmail, IsPhoneNumber } from "class-validator";
import { RegisterUserDto } from "./register.user.dto";

export class RegisterAdminDto extends OmitType(RegisterUserDto, [
	"bio",
	"image",
]) {}
