import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { City } from "./city.entity";
import { CityDto } from "./dto/city.dto";

@Injectable()
export class CitiesService {
	constructor(@InjectModel(City) private CityModel: typeof City) {}

	async create(body: CityDto) {
		console.log(body);
		await this.CityModel.create(body);
		return "done";
	}

	async getAll(search: string | undefined): Promise<City[]> {
		if (search)
			return await this.CityModel.findAll({ where: { name: search } });
		return await this.CityModel.findAll();
	}

	async find(city_id: number): Promise<City> {
		return this.CityModel.findByPk(city_id);
	}
}
