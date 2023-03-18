import { Injectable } from "@nestjs/common";
import { CredentialsService } from "../credentials/credentials.service";
import { credentialDto } from "../credentials/dto/credential.dto";
import { UsersService } from "../users/users.service";
import { registerDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
	constructor(
		private user: UsersService,
		private credential: CredentialsService
	) {}
	async register(body: registerDto) {
		let credentials: credentialDto = {
			user_name: body.user_name,
			email: body.email,
			password: body.password,
		};
		let credential = await this.credential.create(credentials);
		console.log(credential);
	}

	// async validateUser() {

	// }
}
