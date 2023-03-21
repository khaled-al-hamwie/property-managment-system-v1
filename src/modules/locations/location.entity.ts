import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	PrimaryKey,
	Table,
} from "sequelize-typescript";
import { City } from "../cities/city.entity";
import { Country } from "../countries/country.entity";
import { Property } from "../property/property.entity";
import {
	LocationAttributes,
	LocationCreationAttributes,
} from "./interfaces/location.interface";

@Table
export class Location extends Model<
	LocationAttributes,
	LocationCreationAttributes
> {
	@PrimaryKey
	@Column({
		autoIncrement: true,
		type: DataType.INTEGER,
	})
	location_id: number;

	@ForeignKey(() => Country)
	@Column({
		type: DataType.SMALLINT,
		allowNull: false,
	})
	country_id: number;

	@ForeignKey(() => City)
	@Column({
		type: DataType.MEDIUMINT,
		allowNull: false,
	})
	city_id: number;

	@Column({
		type: DataType.STRING(245),
		allowNull: false,
	})
	place: string;

	@Column({
		type: DataType.STRING(245),
		allowNull: true,
	})
	google_map_link: string;

	@BelongsTo(() => Country)
	country: Country;

	@BelongsTo(() => City)
	city: City;

	@HasMany(() => Property)
	properties: Property[];
}
