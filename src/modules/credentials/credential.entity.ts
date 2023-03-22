import {
	Column,
	CreatedAt,
	DataType,
	HasOne,
	Model,
	PrimaryKey,
	Sequelize,
	Table,
} from "sequelize-typescript";
import { User } from "../users/user.entity";
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
		type: DataType.STRING(45),
		allowNull: false,
		unique: true,
	})
	user_name: string;

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

	@HasOne(() => User, { onDelete: "CASCADE" })
	user: User;
}
