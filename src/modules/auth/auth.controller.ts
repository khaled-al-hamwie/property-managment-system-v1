import {
	Body,
	Controller,
	Delete,
	HttpCode,
	HttpStatus,
	Post,
	UseGuards,
} from "@nestjs/common";
import { User } from "src/core/decorator/user.decorator";
import { AuthService } from "./auth.service";
import { RegisterAdminDto } from "./dto/register.admin.dto";
import { RegisterUserDto } from "./dto/register.user.dto";
import { AdminGuard } from "./guard/admin.guard";
import { LocalAuthGuard } from "./guard/local-auth.guard";
import { JwtAttributes } from "./interfaces/jwt.interface";
import { AdminPayload, UserPayload } from "./interfaces/payload.interface";

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
	async logIn(
		@User() user: UserPayload | AdminPayload
	): Promise<JwtAttributes> {
		return await this.authService.login(user);
	}

	@UseGuards(AdminGuard)
	@Post("/admin/register")
	async registerAdmin(@Body() body: RegisterAdminDto) {
		return this.authService.registerAdmin(body);
	}

	@UseGuards(AdminGuard)
	@Delete("/admin/profile")
	async deleteAdmin(@User("admin_id") admin_id: AdminPayload["admin_id"]) {
		return this.authService.deleteAdmin(admin_id);
	}
}
