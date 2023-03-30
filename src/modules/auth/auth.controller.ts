import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	UseGuards,
} from "@nestjs/common";
import { Roles } from "src/core/decorator/roles.decorator";
import { User } from "src/core/decorator/user.decorator";
import { AuthService } from "./auth.service";
import { RegisterAdminDto } from "./dto/register.admin.dto";
import { RegisterUserDto } from "./dto/register.user.dto";
import { Role } from "./enum/role.enum";
import { LocalAuthGuard } from "./guard/local-auth.guard";
import { RolesGuard } from "./guard/roles.guard";
import { JwtAttributes } from "./interfaces/jwt.interface";
import { UserPayload } from "./interfaces/payload.interface";

@Controller("")
export class AuthController {
	constructor(private authService: AuthService) {}
	@Post("/register")
	async registerUser(@Body() body: RegisterUserDto): Promise<JwtAttributes> {
		return await this.authService.registerUser(body);
	}

	@UseGuards(LocalAuthGuard)
	@HttpCode(HttpStatus.OK)
	@Post("/login")
	async logIn(@User() user: UserPayload): Promise<JwtAttributes> {
		return await this.authService.login(user);
	}

	@Post("/admin/register")
	async registerAdmin(@Body() body: RegisterAdminDto) {
		return this.authService.registerAdmin(body);
	}
}
