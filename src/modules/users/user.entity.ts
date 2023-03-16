import { userInfo } from "os";
import {
	Column,
	CreatedAt,
	DataType,
	Model,
	PrimaryKey,
	Table,
} from "sequelize-typescript";

@Table
export class User extends Model<User> {
	@PrimaryKey
	@Column({
		autoIncrement: true,
	})
	user_id: number;

	@Column({
		type: DataType.STRING(45),
		allowNull: false,
		unique: true,
	})
	user_name: string;

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
}
