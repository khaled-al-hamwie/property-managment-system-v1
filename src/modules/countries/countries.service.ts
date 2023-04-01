import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { Country } from "./country.entity";

@Injectable()
export class CountriesService {
	constructor(@InjectModel(Country) private CountryModel: typeof Country) {}
	findAll(search: string): Promise<Country[]> {
		return this.CountryModel.findAll({
			where: { name: { [Op.regexp]: search } },
			include: ["cities"],
		});
	}

	async find(country_id: number): Promise<Country> {
		return this.CountryModel.findByPk(country_id);
	}
}
