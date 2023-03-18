import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { registerDto } from "./dto/register.dto";
import { LocalAuthGuard } from "./guard/local-auth.guard";

@Controller("")
export class AuthController {
	constructor(private authService: AuthService) {}
	@Post("/register")
	async register(@Body() body: registerDto) {
		return await this.authService.register(body);
	}

	@UseGuards(LocalAuthGuard)
	@Post("/login")
	async logIn(@Request() req) {
		return await this.authService.login(req.user);
	}
}
