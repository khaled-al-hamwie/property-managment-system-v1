import { Optional } from "sequelize";

export interface CityAttributes {
	city_id: number;
	name: string;
	state?: string;
}

export interface CityCreationAttributes
	extends Optional<CityAttributes, "city_id"> {}
