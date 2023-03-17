import { Optional } from "sequelize";

export interface CredentialAttributes {
	credential_id: number;
	email: string;
	password: string;
}

export interface CredentialCreationAttributes
	extends Optional<CredentialAttributes, "credential_id"> {}
