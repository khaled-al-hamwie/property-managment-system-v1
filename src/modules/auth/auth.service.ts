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
			email: body.email,
			password: body.password,
		};
		console.log(credentials);
		await this.credential.create(credentials);
	}
}
