import { Inject, Injectable } from "@nestjs/common";
import { LocationCreation } from "../locations/interfaces/location.entity.interface";
import { LocationsService } from "../locations/locations.service";

@Injectable()
export class PropertyService {
	constructor(private Location: LocationsService) {}
	getProperties() {
		return "fjds;";
	}

	async createProperty() {
		// add location
		let location: LocationCreation = {
			country_id: 0,
			city_id: 0,
			place: "",
		};
		// let country=
		await this.Location.add(location);
		return "hi";
	}
}
