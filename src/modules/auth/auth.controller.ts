import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { User } from "src/core/decorator/user.decorator";
import { AuthService } from "./auth.service";
import { registerDto } from "./dto/register.dto";
import { LocalAuthGuard } from "./guard/local-auth.guard";
import { JwtAttributes } from "./interfaces/jwt.interface";
import { PayloadAttributes } from "./interfaces/payload.interface";

@Controller("")
export class AuthController {
	constructor(private authService: AuthService) {}
	@Post("/register")
	async register(@Body() body: registerDto): Promise<JwtAttributes> {
		return await this.authService.register(body);
	}

	@UseGuards(LocalAuthGuard)
	@Post("/login")
	async logIn(@User() user: PayloadAttributes): Promise<JwtAttributes> {
		return await this.authService.login(user);
	}
}
