import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import PropertyTypeDto from "./dto/property-type.dto";
import { PropertyType } from "./property-type.entity";

@Injectable()
export class PropertyTypesService {
	constructor(
		@InjectModel(PropertyType)
		private PropertyTypeModel: typeof PropertyType
	) {}
	async find(property_type_id: number): Promise<PropertyType> {
		return this.PropertyTypeModel.findOne({
			where: {
				property_type_id,
			},
			limit: 1,
		});
	}
	async findAll(): Promise<PropertyType[]> {
		return this.PropertyTypeModel.findAll();
	}
	async create(body: PropertyTypeDto) {
		const propertyType = await this.PropertyTypeModel.findOne({
			where: { name: body.name },
		});
		if (propertyType) {
			throw new ConflictException();
		}
		await this.PropertyTypeModel.create(body);
		return "done";
	}
}
