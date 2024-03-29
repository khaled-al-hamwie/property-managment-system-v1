import { Optional } from "sequelize";

export interface CredentialAttributes {
	credential_id: number;
	user_name: string;
	email: string;
	password: string;
	is_admin: boolean;
}

export interface CredentialCreationAttributes
	extends Optional<CredentialAttributes, "credential_id"> {}
