import {
	ForbiddenException,
	Injectable,
	InternalServerErrorException,
	NotAcceptableException,
	NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { LocationCreation } from "../locations/interfaces/location.entity.interface";
import { Location } from "../locations/location.entity";
import { LocationsService } from "../locations/locations.service";
import { PropertyType } from "../property-types/property-type.entity";
import { PropertyTypesService } from "../property-types/property-types.service";
import { UploadService } from "../upload/upload.service";
import { PropertyCreateDto } from "./dto/property.create.dto";
import { PropertyUpdateDto } from "./dto/property.update.dto";
import { PropertyDelete } from "./interfaces/property.delete.interface";
import {
	PropertyAttributes,
	PropertyCreationAttributes,
} from "./interfaces/property.interface";
import { PropertyUpdate } from "./interfaces/property.update.interface";
import { Property } from "./property.entity";

@Injectable()
export class PropertyService {
	constructor(
		@InjectModel(Property) private PropertyModule: typeof Property,
		private Location: LocationsService,
		private PropertyType: PropertyTypesService,
		private uploadService: UploadService
	) {}
	async getAll(owner_id: number, limit: number = 5, offset: number = 0) {
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

	async create(
		owner_id: number,
		{
			city_id,
			country_id,
			name,
			place,
			is_private,
			property_type_id,
			description,
			google_map_link,
		}: PropertyCreateDto,
		image: Express.Multer.File
	) {
		const location_attributes: LocationCreation = {
			country_id,
			city_id,
			place,
			google_map_link,
		};
		const property_type = await this.PropertyType.find(property_type_id);
		if (!property_type) {
			throw new ForbiddenException(
				["property_type_id non existed property_type_id"],
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
		};
		if (image) {
			const image_name = this.uploadService.createName(
				image.originalname.trim()
			);
			try {
				this.uploadService.upload(image.buffer, image_name);
				await this.PropertyModule.create({
					...property_attributes,
					images: image_name,
				});
			} catch (error) {
				throw new InternalServerErrorException();
			}
		}
		await this.PropertyModule.create({
			...property_attributes,
		});
		return "done";
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
			throw new NotFoundException("property does't exists");
		}
		return property;
	}
	async updateProperty(
		property_id: PropertyAttributes["property_id"],
		owner_id: PropertyAttributes["owner_id"],
		body: PropertyUpdateDto,
		image: Express.Multer.File
	) {
		if (image) {
			const image_name = this.uploadService.createName(
				image.originalname.trim()
			);
			const property = await this.PropertyModule.update(
				{ ...body, images: image_name },
				{
					where: { property_id, owner_id },
					limit: 1,
				}
			);
			if (property[0] == 0) throw new NotFoundException();
			try {
				this.uploadService.upload(image.buffer, image_name);
			} catch (error) {
				throw new InternalServerErrorException();
			}
		} else {
			const property = await this.PropertyModule.update(body, {
				where: { property_id, owner_id },
				limit: 1,
			});
			if (property[0] == 0) throw new NotFoundException();
		}
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
