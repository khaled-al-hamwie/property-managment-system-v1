import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { registerDto } from "./dto/register.dto";

@Controller("")
export class AuthController {
	constructor(private authService: AuthService) {}
	@Post("/register")
	async register(@Body() body: registerDto) {
		await this.authService.register(body);
		// return body;
	}
}
