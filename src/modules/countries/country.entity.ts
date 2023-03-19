import {
	Column,
	DataType,
	HasMany,
	Model,
	PrimaryKey,
	Table,
} from "sequelize-typescript";
import { Location } from "../locations/location.entity";
import {
	CountryAttributes,
	CountryCreationAttributes,
} from "./interfaces/country.interface";

@Table
export class Country extends Model<
	CountryAttributes,
	CountryCreationAttributes
> {
	@PrimaryKey
	@Column({
		autoIncrement: true,
		type: DataType.SMALLINT,
	})
	country_id: number;

	@Column({
		type: DataType.STRING(45),
		allowNull: false,
	})
	name: string;

	@Column({
		type: DataType.STRING(2),
		allowNull: false,
	})
	iso: string;
	@Column({
		type: DataType.STRING(20),
		allowNull: false,
	})
	currency: string;

	@HasMany(() => Location)
	locations: Location[];
}
