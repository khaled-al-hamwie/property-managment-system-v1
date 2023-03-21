import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { PropertyType } from "./property-type.entity";

@Injectable()
export class PropertyTypesService {
	constructor(
		@InjectModel(PropertyType)
		private PropertyTypeModel: typeof PropertyType
	) {}
	async find(property_type_id: number): Promise<PropertyType> {
		return this.PropertyTypeModel.findByPk(property_type_id);
	}
}
