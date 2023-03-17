import {
	Column,
	DataType,
	Model,
	PrimaryKey,
	Table,
} from "sequelize-typescript";
import {
	CredentialAttributes,
	CredentialCreationAttributes,
} from "./interfaces/credential.interface";

@Table
export class Credential extends Model<
	CredentialAttributes,
	CredentialCreationAttributes
> {
	@PrimaryKey
	@Column({
		autoIncrement: true,
	})
	credential_id: number;

	@Column({
		type: DataType.STRING(245),
		allowNull: false,
		unique: true,
	})
	email: string;

	@Column({
		type: DataType.STRING(500),
		allowNull: false,
	})
	password: string;
}
