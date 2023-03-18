import {
	ForbiddenException,
	Injectable,
	InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { compare, hash } from "bcryptjs";
import { UsersService } from "../users/users.service";
import { Credential } from "./credential.entity";
import { credentialDto, credentialUserNameDto } from "./dto/credential.dto";

@Injectable()
export class CredentialsService {
	constructor(
		@InjectModel(Credential)
		private CredentialModel: typeof Credential,
		private UsersService: UsersService
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

	async findByUserName({ password, user_name }: credentialUserNameDto) {
		const credential = await this.CredentialModel.findOne({
			where: { user_name },
		});
		if (!user_name) return false;
		try {
			let hashed = await compare(password, credential.password);
			if (!hashed) return false;
			return await this.UsersService.find(credential.credential_id);
		} catch (error) {
			return false;
		}
	}
}
