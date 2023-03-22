import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import * as dotenv from "dotenv";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/modules/users/users.service";
import { PayloadAttributes } from "../interfaces/payload.interface";

dotenv.config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private userService: UsersService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWTKEY,
		});
	}

	async validate(payload: PayloadAttributes) {
		const user = await this.userService.findByUserId(payload.user_id);
		if (!user) {
			throw new UnauthorizedException();
		}
		return { user_id: payload.user_id, user_name: payload.user_name };
	}
}
