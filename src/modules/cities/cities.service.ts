import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { City } from "./city.entity";
import { CityDto } from "./dto/city.dto";

@Injectable()
export class CitiesService {
	constructor(@InjectModel(City) private CityModel: typeof City) {}

	async create(body: CityDto) {
		await this.CityModel.create(body);
		return "done";
	}

	findAll(search: string): Promise<City[]> {
		return this.CityModel.findAll({
			where: { name: { [Op.regexp]: search } },
			order: [["city_id", "DESC"]],
		});
	}

	async find(city_id: number): Promise<City> {
		return this.CityModel.findByPk(city_id);
	}
}
