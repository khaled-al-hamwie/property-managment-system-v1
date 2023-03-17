import { Inject, Injectable } from "@nestjs/common";
import { CREDENTIAL_REPOSITORY } from "src/core/constants";
import { Credential } from "./credential.entity";
import { credentialDto } from "./dto/credential.dto";

@Injectable()
export class CredentialsService {
	constructor(
		@Inject(CREDENTIAL_REPOSITORY)
		private readonly credential: typeof Credential
	) {}
	async create(credentials: credentialDto) {
		console.log(credentials);
		await this.credential.create(credentials);
	}
}
