import { ForbiddenException, Injectable, Module } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CitiesService } from "../cities/cities.service";
import { CountriesService } from "../countries/countries.service";
import { LocationCreation } from "./interfaces/location.entity.interface";
import { Location } from "./location.entity";

@Injectable()
export class LocationsService {
	constructor(
		@InjectModel(Location) private LocationModel: typeof Location,
		private City: CitiesService,
		private Country: CountriesService
	) {}
	async create(location: LocationCreation): Promise<Location> {
		const city = await this.City.find(location.city_id);
		const country = await this.Country.find(location.country_id);
		if (!city) {
			throw new ForbiddenException("city_id unvalid city", {
				description: "Forbidden",
			});
		}
		if (!country) {
			throw new ForbiddenException("country_id unvalid country", {
				description: "Forbidden",
			});
		}
		return await this.LocationModel.create(location);
	}
}
