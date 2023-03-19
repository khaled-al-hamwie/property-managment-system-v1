import { Optional } from "sequelize";

export interface LocationAttributes {
	location_id: number;
	country_id: number;
	city_id: number;
	place: string;
	google_map_link?: string;
}

export interface LocationCreationAttributes
	extends Optional<LocationAttributes, "location_id"> {}
