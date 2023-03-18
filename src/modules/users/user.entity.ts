import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	PrimaryKey,
	Table,
} from "sequelize-typescript";
import { Credential } from "../credentials/credential.entity";
import {
	UserAttributes,
	UserCreationAttributes,
} from "./interfaces/user.interface";

@Table
export class User extends Model<UserAttributes, UserCreationAttributes> {
	@PrimaryKey
	@Column({
		autoIncrement: true,
	})
	user_id: number;

	@ForeignKey(() => Credential)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	credential_id: number;

	@Column({
		type: DataType.STRING(45),
		allowNull: false,
	})
	first_name: string;

	@Column({
		type: DataType.STRING(45),
		allowNull: false,
	})
	last_name: string;

	@Column({
		type: DataType.STRING(245),
		allowNull: true,
	})
	bio: string;

	@Column({
		type: DataType.STRING(12),
		allowNull: true,
	})
	phone_number: string;

	@Column({
		type: DataType.STRING(245),
		allowNull: true,
	})
	contact_email: string;

	@Column({
		type: DataType.STRING(45),
		allowNull: true,
	})
	image: string;

	@BelongsTo(() => Credential)
	credential: Credential;
}
