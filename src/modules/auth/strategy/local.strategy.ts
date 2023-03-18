import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { PayloadAttributes } from "../interfaces/payload.interface";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "local") {
	constructor(private authService: AuthService) {
		super({ usernameField: "user_name" });
	}

	async validate(
		user_name: string,
		password: string
	): Promise<PayloadAttributes> {
		const result = await this.authService.checkCredentials(
			user_name,
			password
		);
		if (!result) {
			throw new UnauthorizedException();
		}
		return result;
	}
}
