import { Injectable, Module } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { LocationCreation } from "./interfaces/location.entity.interface";
import { Location } from "./location.entity";

@Injectable()
export class LocationsService {
	constructor(
		@InjectModel(Location) private LocationModel: typeof Location
	) {}
	async add(location: LocationCreation): Promise<Location> {
		return await this.LocationModel.create(location);
	}
}
