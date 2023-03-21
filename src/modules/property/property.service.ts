import { Inject, Injectable } from "@nestjs/common";
import { CitiesService } from "../cities/cities.service";
import { CountriesService } from "../countries/countries.service";
import { LocationCreation } from "../locations/interfaces/location.entity.interface";
import { LocationsService } from "../locations/locations.service";

@Injectable()
export class PropertyService {
	constructor(
		private Location: LocationsService,
		private City: CitiesService,
		private Country: CountriesService
	) {}
	getProperties() {
		return "fjds;";
	}

	async createProperty() {
		// add location
		let location: LocationCreation = {
			country_id: 1,
			city_id: 1,
			place: "in the La Rambla next to the pitza hat",
		};
		// check if country and city exist
		const city = await this.City.find(location.city_id);
		const country = await this.Country.find(location.country_id);
		if (!city || !country) {
			return "invalid city or country";
		}
		await this.Location.add(location);
		return "hi";
	}
}
