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
import { Country } from "../countries/country.entity";
import { Location } from "../locations/location.entity";
import {
	CityAttributes,
	CityCreationAttributes,
} from "./interfaces/city.interface";

@Table
export class City
	extends Model<CityAttributes, CityCreationAttributes>
	implements CityCreationAttributes
{
	@PrimaryKey
	@Column({
		autoIncrement: true,
		type: DataType.MEDIUMINT,
	})
	city_id: number;

	@ForeignKey(() => Country)
	@Column({
		type: DataType.SMALLINT,
		allowNull: false,
	})
	country_id: number;

	@Column({
		type: DataType.STRING(45),
		allowNull: false,
	})
	name: string;

	@Column({
		type: DataType.STRING(45),
		allowNull: true,
	})
	state: string;

	@HasMany(() => Location)
	locations: Location[];

	@BelongsTo(() => Country)
	country: Country;
}
