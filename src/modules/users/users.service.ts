import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserDto } from "./dto/user.dto";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
	constructor(
		// @Inject(USER_REPOSITORY) private readonly userRepository: typeof User
		@InjectModel(User) private UserModel: typeof User
	) {}

	async create(user: UserDto) {
		return await this.UserModel.create(user);
	}
}
