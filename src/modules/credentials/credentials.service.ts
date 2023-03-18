import {
	ForbiddenException,
	HttpException,
	HttpStatus,
	Injectable,
	InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { hash } from "bcryptjs";
import { Op } from "sequelize";
import { Credential } from "./credential.entity";
import { credentialDto } from "./dto/credential.dto";

@Injectable()
export class CredentialsService {
	constructor(
		@InjectModel(Credential)
		private CredentialModel: typeof Credential
	) {}
	async create({ email, password, user_name }: credentialDto) {
		let userWithSameEmail = await this.CredentialModel.findOne({
			where: { email },
		});
		let userWithSameUserName = await this.CredentialModel.findOne({
			where: { user_name },
		});
		if (userWithSameEmail)
			throw new ForbiddenException("email you can't use this email", {
				description: "Forbidden",
			});
		if (userWithSameUserName)
			throw new ForbiddenException(
				"user_name you can't use this user_name",
				{
					description: "Forbidden",
				}
			);
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
}
