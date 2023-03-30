import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AdminsService } from "src/modules/admins/admins.service";
import { AdminPayload } from "../interfaces/payload.interface";

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, "admin") {
	constructor(private adminService: AdminsService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWTKEY,
		});
	}

	async validate(payload: AdminPayload) {
		const id = payload.admin_id;
		if (!id) {
			throw new UnauthorizedException();
		}
		const admin = await this.adminService.findById(payload.admin_id);
		if (!admin) {
			throw new UnauthorizedException();
		}
		return { admin_id: payload.admin_id, user_name: payload.user_name };
	}
}
