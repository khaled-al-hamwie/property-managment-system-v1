import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import * as dotenv from "dotenv";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PayloadAttributes } from "../interfaces/payload.interface";

dotenv.config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWTKEY,
		});
	}

	async validate(payload: PayloadAttributes) {
		return { user_id: payload.user_id, user_name: payload.user_name };
	}
}
