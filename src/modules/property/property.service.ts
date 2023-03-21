import { ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CitiesService } from "../cities/cities.service";
import { CountriesService } from "../countries/countries.service";
import { LocationCreation } from "../locations/interfaces/location.entity.interface";
import { LocationsService } from "../locations/locations.service";
import { PropertyTypesService } from "../property-types/property-types.service";
import { PropertyDto } from "./dto/property.dto";
import { PropertyCreate } from "./interfaces/property.create.interface";
import { PropertyCreationAttributes } from "./interfaces/property.interface";
import { Property } from "./property.entity";

@Injectable()
export class PropertyService {
	constructor(
		@InjectModel(Property) private PropertyModule: typeof Property,
		private Location: LocationsService,
		private PropertyType: PropertyTypesService
	) {}
	getProperties() {
		return "fjds;";
	}

	async createProperty({
		city_id,
		country_id,
		owner_id,
		name,
		place,
		is_private,
		property_type_id,
		description,
		google_map_link,
		images,
	}: PropertyCreate) {
		const location_attributes: LocationCreation = {
			country_id,
			city_id,
			place,
			google_map_link,
		};
		const property_type = await this.PropertyType.find(property_type_id);
		if (!property_type) {
			throw new ForbiddenException(
				"property_type_id unvalid property type",
				{
					description: "Forbidden",
				}
			);
		}
		const location = await this.Location.create(location_attributes);

		const property_attributes: PropertyCreationAttributes = {
			owner_id,
			property_type_id,
			location_id: location.location_id,
			name: name,
			private: is_private,
			description,
			images,
		};
		await this.PropertyModule.create(property_attributes);
		return "";
	}
}
