import { Optional } from "sequelize";

export interface CountryAttributes {
	country_id: number;
	name: string;
	state?: string;
}

export interface CountryCreationAttributes
	extends Optional<CountryAttributes, "country_id"> {}
