import {
	Column,
	DataType,
	HasMany,
	Model,
	PrimaryKey,
	Table,
} from "sequelize-typescript";
import { Property } from "../property/property.entity";
import {
	PropertyTypeAttributes,
	PropertyTypeCreationAttributes,
} from "./interfaces/property-type.interface";

@Table
export class PropertyType extends Model<
	PropertyTypeAttributes,
	PropertyTypeCreationAttributes
> {
	@PrimaryKey
	@Column({
		type: DataType.SMALLINT,
		autoIncrement: true,
	})
	property_type_id: number;

	@Column({
		type: DataType.STRING(45),
		allowNull: false,
	})
	name: string;

	@HasMany(() => Property)
	properties: Property[];
}
