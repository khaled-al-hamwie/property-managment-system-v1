import { Optional } from "sequelize";

export interface PropertyAttributes {
	property_id: number;
	owner_id: number;
	property_type_id: number;
	location_id: number;
	name: string;
	private: boolean;
	description?: string;
	images?: string;
}

export interface PropertyCreationAttributes
	extends Optional<PropertyAttributes, "property_id"> {}
