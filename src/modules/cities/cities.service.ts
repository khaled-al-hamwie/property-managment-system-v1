import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { City } from "./city.entity";

@Injectable()
export class CitiesService {
	constructor(@InjectModel(City) private CityModel: typeof City) {}
	async getAll(search: string | undefined): Promise<City[]> {
		if (search)
			return await this.CityModel.findAll({ where: { name: search } });
		return await this.CityModel.findAll();
	}

	async find(city_id: number) {
		await this.CityModel.findByPk(city_id);
	}
}
