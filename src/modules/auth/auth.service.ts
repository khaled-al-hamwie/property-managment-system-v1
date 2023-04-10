import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { AdminsService } from "../admins/admins.service";
import { AdminDto } from "../admins/dot/admin.dto";
import { CredentialsService } from "../credentials/credentials.service";
import { credentialDto } from "../credentials/dto/credential.dto";
import { CredentialUsernameLog } from "../credentials/interfaces/credential-log.interface";
import { UserDto } from "../users/dto/user.dto";
import { UsersService } from "../users/users.service";
import { RegisterAdminDto } from "./dto/register.admin.dto";
import { RegisterUserDto } from "./dto/register.user.dto";
import { JwtAttributes } from "./interfaces/jwt.interface";
import { AdminPayload, UserPayload } from "./interfaces/payload.interface";

@Injectable()
export class AuthService {
	constructor(
		private user: UsersService,
		private admin: AdminsService,
		private credential: CredentialsService,
		private jwtService: JwtService,
		private configService: ConfigService
	) {}
	async registerUser(body: RegisterUserDto): Promise<JwtAttributes> {
		const credential_attributes: credentialDto = {
			user_name: body.user_name,
			email: body.email,
			password: body.password,
			is_admin: false,
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
		const payload: UserPayload = {
			user_id: user.user_id,
			user_name: credential.user_name,
		};
		return this.signToken(payload);
	}

	async registerAdmin(body: RegisterAdminDto) {
		const credential_attributes: credentialDto = {
			user_name: body.user_name,
			email: body.email,
			password: body.password,
			is_admin: true,
		};
		const credential = await this.credential.create(credential_attributes);
		const admin_attributes: AdminDto = {
			credential_id: credential.credential_id,
			first_name: body.first_name,
			last_name: body.last_name,
			contact_email: body.contact_email,
			phone_number: body.phone_number,
		};
		const admin = await this.admin.create(admin_attributes);

		const payload: AdminPayload = {
			admin_id: admin.admin_id,
			user_name: credential.user_name,
		};
		return this.signToken(payload);
	}

	async checkCredentials(
		user_name: string,
		password: string
	): Promise<UserPayload | AdminPayload> {
		let credential_attributes: CredentialUsernameLog = {
			user_name,
			password,
		};
		const credential = await this.credential.verefiyByUserName(
			credential_attributes
		);
		if (!credential) return null;
		else if (credential.is_admin) {
			const admin = await this.admin.findByCredentialId(
				credential.credential_id
			);
			if (!admin) return null;
			return {
				user_name: credential.user_name,
				admin_id: admin.admin_id,
			};
		} else {
			const user = await this.user.findByCredentialId(
				credential.credential_id
			);
			if (!user) return null;

			return {
				user_name: credential.user_name,
				user_id: user.user_id,
			};
		}
	}

	async login(user: UserPayload | AdminPayload): Promise<JwtAttributes> {
		let payload: UserPayload | AdminPayload;
		if ("user_id" in user) {
			payload = {
				user_id: user.user_id,
				user_name: user.user_name,
			};
		} else if ("admin_id" in user) {
			payload = {
				admin_id: user.admin_id,
				user_name: user.user_name,
			};
		}
		return this.signToken(payload);
	}

	async deleteAdmin(admin_id: number) {
		const admin = await this.admin.findById(admin_id);
		const credential_id = admin.credential_id;
		const credential = await this.credential.findById(credential_id);
		await admin.destroy();
		await credential.destroy();
		return "done";
	}
	async deleteUser(user_id: number) {
		const user = await this.user.findById(user_id);
		console.log(user);
		const credential_id = user.credential_id;
		console.log(credential_id);
		const credential = await this.credential.findById(credential_id);
		await user.destroy();
		await credential.destroy();
		return "done";
	}

	async signToken(
		payload: UserPayload | AdminPayload
	): Promise<JwtAttributes> {
		const option = {
			secret: this.configService.get("JWTKEY"),
			expiresIn: this.configService.get("TOKEN_EXPIRATION"),
		};
		return {
			access_token: this.jwtService.sign(payload, option),
		};
	}
}
