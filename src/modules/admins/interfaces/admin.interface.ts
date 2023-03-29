import { Optional } from "sequelize";

export interface AdminAttributes {
	admin_id: number;
	credential_id: number;
	first_name: string;
	last_name: string;
	contact_email: string;
	phone_number: string;
}

export interface AdminCreationAttributes
	extends Optional<AdminAttributes, "admin_id"> {}
