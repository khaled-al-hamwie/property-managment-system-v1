import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "./admin.entity";
import { AdminDto } from "./dot/admin.dto";

@Injectable()
export class AdminsService {
	constructor(@InjectModel(Admin) private AdminModel: typeof Admin) {}
	async create(user: AdminDto) {
		try {
			return await this.AdminModel.create(user);
		} catch (error) {
			throw new InternalServerErrorException();
		}
	}

	findById(admin_id: number): Promise<Admin> {
		return this.AdminModel.findByPk(admin_id);
	}
}
