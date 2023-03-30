import {
	ForbiddenException,
	Injectable,
	InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { compare, hash } from "bcryptjs";
import { Credential } from "./credential.entity";
import { credentialDto } from "./dto/credential.dto";
import { CredentialUsernameLog } from "./interfaces/credential-log.interface";

@Injectable()
export class CredentialsService {
	constructor(
		@InjectModel(Credential)
		private CredentialModel: typeof Credential
	) {}
	async create({ email, password, user_name }: credentialDto) {
		const messages = [];
		let userWithSameEmail = await this.CredentialModel.findOne({
			where: { email },
		});
		let userWithSameUserName = await this.CredentialModel.findOne({
			where: { user_name },
		});
		if (userWithSameEmail) messages.push("email you can't use this email");
		if (userWithSameUserName)
			messages.push("user_name you can't use this user_name");

		if (messages.length >= 1) {
			throw new ForbiddenException(messages, {
				description: "Forbidden",
			});
		}
		try {
			password = await hash(password, 12);
			let credential = await this.CredentialModel.create({
				user_name,
				email,
				password,
			});
			return credential;
		} catch (error) {
			throw new InternalServerErrorException();
		}
	}

	async verefiyByUserName({
		password,
		user_name,
	}: CredentialUsernameLog): Promise<Credential> {
		const credential = await this.CredentialModel.findOne({
			where: { user_name },
		});
		if (!credential) return null;
		let hashed = await compare(password, credential.password);
		if (!hashed) return null;
		return credential;
	}
}
