import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Credential } from "./credential.entity";
import { credentialDto } from "./dto/credential.dto";

@Injectable()
export class CredentialsService {
	constructor(
		@InjectModel(Credential)
		private CredentialModel: typeof Credential
	) {}
	async create({ email, password }: credentialDto) {
		// check if email exist
		// hash the password

		let credential: credentialDto = {
			email: email,
			password,
		};
		return await this.CredentialModel.create();
	}
}
