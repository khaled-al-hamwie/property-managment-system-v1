import {
	ForbiddenException,
	Inject,
	Injectable,
	NotAcceptableException,
	NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CitiesService } from "../cities/cities.service";
import { CountriesService } from "../countries/countries.service";
import { LocationCreation } from "../locations/interfaces/location.entity.interface";
import { Location } from "../locations/location.entity";
import { LocationsService } from "../locations/locations.service";
import { PropertyType } from "../property-types/property-type.entity";
import { PropertyTypesService } from "../property-types/property-types.service";
import { PropertyCreateDto } from "./dto/property.create.dto";
import { PropertyCreate } from "./interfaces/property.create.interface";
import { PropertyDelete } from "./interfaces/property.delete.interface";
import { PropertyCreationAttributes } from "./interfaces/property.interface";
import { PropertyUpdate } from "./interfaces/property.update.interface";
import { Property } from "./property.entity";

@Injectable()
export class PropertyService {
	constructor(
		@InjectModel(Property) private PropertyModule: typeof Property,
		private Location: LocationsService,
		private PropertyType: PropertyTypesService
	) {}
	async getMyProperties(
		owner_id: number,
		limit: number = 5,
		offset: number = 0
	) {
		if (limit <= 0 || offset < 0) {
			throw new NotAcceptableException();
		}
		return this.PropertyModule.findAll({
			where: { owner_id },
			include: [PropertyType, Location],
			offset,
			limit,
		});
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
	async getProperty(
		property_id: number,
		owner_id: number
	): Promise<Property> {
		const property = await Property.findOne({
			where: { property_id, owner_id },
			limit: 1,
		});
		if (!property) {
			throw new NotFoundException();
		}
		return property;
	}
	async updateProperty(body: PropertyUpdate) {
		const property = await this.PropertyModule.update(body, {
			where: { property_id: body.property_id, owner_id: body.owner_id },
			limit: 1,
		});
		if (property[0] == 0) throw new NotFoundException();
		return "done";
	}

	async deleteProperty(body: PropertyDelete) {
		const property = await this.PropertyModule.destroy({
			where: { property_id: body.property_id, owner_id: body.owner_id },
			limit: 1,
		});
		if (property == 0) throw new NotFoundException();
		return "done";
	}
}
