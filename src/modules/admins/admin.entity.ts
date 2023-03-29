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
	AdminAttributes,
	AdminCreationAttributes,
} from "./interfaces/admin.interface";

@Table
export class Admin
	extends Model<AdminAttributes, AdminCreationAttributes>
	implements AdminCreationAttributes
{
	@PrimaryKey
	@Column({
		type: DataType.SMALLINT,
		autoIncrement: true,
	})
	admin_id?: number;
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
		allowNull: false,
		unique: true,
	})
	contact_email: string;

	@Column({
		type: DataType.STRING(12),
		allowNull: false,
		unique: true,
	})
	phone_number: string;

	@BelongsTo(() => Credential)
	credential: Credential;
}
