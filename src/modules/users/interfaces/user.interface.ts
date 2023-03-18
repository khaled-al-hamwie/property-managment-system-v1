import { Optional } from "sequelize";

export interface UserAttributes {
	user_id: number;
	credential_id: number;
	first_name: string;
	last_name: string;
	bio?: string;
	contact_email?: string;
	phone_number?: string;
	image?: string;
}

export interface UserCreationAttributes
	extends Optional<UserAttributes, "user_id"> {}
