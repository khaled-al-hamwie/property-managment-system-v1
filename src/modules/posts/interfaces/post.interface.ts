import { Optional } from "sequelize";

export interface PostAttributes {
	post_id: number;
	property_id: number;
	title: string;
	description: string;
	price: number;
}

export interface PostCreationAttributes
	extends Optional<PostAttributes, "post_id"> {
	property_id: number;
	title: string;
	description: string;
	price: number;
}
