import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Country } from "./country.entity";

@Injectable()
export class CountriesService {
	constructor(@InjectModel(Country) private CountryModel: typeof Country) {}
	async getAll(search: string | undefined): Promise<Country[]> {
		if (search)
			return await this.CountryModel.findAll({ where: { name: search } });
		return await this.CountryModel.findAll();
	}

	async find(country_id: number) {
		await this.CountryModel.findByPk(country_id);
	}
}
