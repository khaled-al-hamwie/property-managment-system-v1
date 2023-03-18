import {
	Inject,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { NotFoundError } from "rxjs";
import { UserDto } from "./dto/user.dto";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
	constructor(@InjectModel(User) private UserModel: typeof User) {}

	async create(user: UserDto) {
		try {
			return await this.UserModel.create(user);
		} catch (error) {
			throw new InternalServerErrorException();
		}
	}

	async find(credential_id: number): Promise<User> {
		return await this.UserModel.findOne({ where: { credential_id } });
	}
}
