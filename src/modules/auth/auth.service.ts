import { Injectable } from "@nestjs/common";
import { CredentialsService } from "../credentials/credentials.service";
import { credentialDto } from "../credentials/dto/credential.dto";
import { UserDto } from "../users/dto/user.dto";
import { UsersService } from "../users/users.service";
import { registerDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
	constructor(
		private user: UsersService,
		private credential: CredentialsService
	) {}
	async register(body: registerDto) {
		const credential_attributes: credentialDto = {
			user_name: body.user_name,
			email: body.email,
			password: body.password,
		};
		let credential = await this.credential.create(credential_attributes);
		const user_attributes: UserDto = {
			credential_id: credential.credential_id,
			first_name: body.first_name,
			last_name: body.last_name,
			bio: body.bio,
			contact_email: body.contact_email,
			phone_number: body.phone_number,
			image: body.image,
		};
		let user = await this.user.create(user_attributes);
		return "done";
	}

	async validateUser(user_name: string, password: string) {
		let credential_attributes = {
			user_name,
			password,
		};
		const credential = await this.credential.findByUserName(
			credential_attributes
		);
		if (credential) return credential;
		return false;
	}
}
