import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { CredentialsService } from "../credentials/credentials.service";
import { credentialDto } from "../credentials/dto/credential.dto";
import { CredentialUsernameLog } from "../credentials/interfaces/credential-log.interface";
import { UserDto } from "../users/dto/user.dto";
import { UsersService } from "../users/users.service";
import { registerDto } from "./dto/register.dto";
import { JwtAttributes } from "./interfaces/jwt.interface";
import { PayloadAttributes } from "./interfaces/payload.interface";

@Injectable()
export class AuthService {
	constructor(
		private user: UsersService,
		private credential: CredentialsService,
		private jwtService: JwtService,
		private configService: ConfigService
	) {}
	async register(body: registerDto): Promise<JwtAttributes> {
		const credential_attributes: credentialDto = {
			user_name: body.user_name,
			email: body.email,
			password: body.password,
		};
		const credential = await this.credential.create(credential_attributes);
		const user_attributes: UserDto = {
			credential_id: credential.credential_id,
			first_name: body.first_name,
			last_name: body.last_name,
			bio: body.bio,
			contact_email: body.contact_email,
			phone_number: body.phone_number,
			image: body.image,
		};
		const user = await this.user.create(user_attributes);
		const payload: PayloadAttributes = {
			user_id: user.user_id,
			user_name: credential.user_name,
		};
		return this.signToken(payload);
	}

	async checkCredentials(
		user_name: string,
		password: string
	): Promise<PayloadAttributes> {
		let credential_attributes: CredentialUsernameLog = {
			user_name,
			password,
		};
		const credential = await this.credential.verefiyByUserName(
			credential_attributes
		);
		if (!credential) return null;
		const user = await this.user.findByCredentialId(
			credential.credential_id
		);
		if (!user) return null;
		return {
			user_name: credential.user_name,
			user_id: user.user_id,
		};
	}

	async login(user: PayloadAttributes): Promise<JwtAttributes> {
		const payload = { user_name: user.user_name, sub: user.user_id };
		const option = {
			secret: this.configService.get("JWTKEY"),
			expiresIn: this.configService.get("TOKEN_EXPIRATION"),
		};
		return {
			access_token: this.jwtService.sign(payload, option),
		};
	}

	async signToken({
		user_name,
		user_id,
	}: PayloadAttributes): Promise<JwtAttributes> {
		const payload = { user_name, user_id };
		const option = {
			secret: this.configService.get("JWTKEY"),
			expiresIn: this.configService.get("TOKEN_EXPIRATION"),
		};
		return {
			access_token: this.jwtService.sign(payload, option),
		};
	}
}
