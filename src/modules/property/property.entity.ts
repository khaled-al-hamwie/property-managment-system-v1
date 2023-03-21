import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	PrimaryKey,
	Table,
} from "sequelize-typescript";
import { Location } from "../locations/location.entity";
import { PropertyType } from "../property-types/property-type.entity";
import { User } from "../users/user.entity";
import {
	PropertyAttributes,
	PropertyCreationAttributes,
} from "./interfaces/property.interface";

@Table
export class Property extends Model<
	PropertyAttributes,
	PropertyCreationAttributes
> {
	@PrimaryKey
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
	})
	property_id: number;

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	owner_id: number;

	@ForeignKey(() => PropertyType)
	@Column({
		type: DataType.SMALLINT,
		allowNull: false,
	})
	property_type_id: number;

	@ForeignKey(() => Location)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	location_id: number;

	@Column({
		type: DataType.STRING(45),
		allowNull: false,
	})
	name: string;

	@Column({
		type: DataType.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	})
	private: boolean;

	@Column({
		type: DataType.STRING(500),
		allowNull: true,
	})
	description: string;

	@Column({
		type: DataType.STRING(500),
		allowNull: true,
	})
	images: string[];

	@BelongsTo(() => User)
	owner: User;

	@BelongsTo(() => PropertyType)
	property_type: PropertyType;

	@BelongsTo(() => Location)
	location: Location;
}
