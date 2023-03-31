import { Optional } from "sequelize";

export interface CountryAttributes {
	country_id: number;
	name: string;
	iso: string;
	currency: string;
}

export interface CountryCreationAttributes
	extends Optional<CountryAttributes, "country_id"> {}
