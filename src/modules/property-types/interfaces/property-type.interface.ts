import { Optional } from "sequelize";

export interface PropertyTypeAttributes {
	property_type_id: number;
	name: string;
}

export interface PropertyTypeCreationAttributes
	extends Optional<PropertyTypeAttributes, "property_type_id"> {}
