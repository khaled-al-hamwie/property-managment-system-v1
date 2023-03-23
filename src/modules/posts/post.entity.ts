import {
	BelongsTo,
	Column,
	CreatedAt,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	PrimaryKey,
	Table,
	UpdatedAt,
} from "sequelize-typescript";
import { Comment } from "../comments/entities/comment.entity";
import { Property } from "../property/property.entity";
import { User } from "../users/user.entity";
import {
	PostAttributes,
	PostCreationAttributes,
} from "./interfaces/post.interface";

@Table
export class Post extends Model<PostAttributes, PostCreationAttributes> {
	@PrimaryKey
	@Column({
		autoIncrement: true,
		type: DataType.BIGINT,
	})
	post_id: number;

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	owner_id: number;

	@ForeignKey(() => Property)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	property_id: number;

	@Column({
		type: DataType.STRING(45),
		allowNull: false,
	})
	title: string;

	@Column({
		type: DataType.STRING(500),
		allowNull: false,
	})
	description: string;

	@Column({
		type: DataType.DECIMAL(9, 2),
		allowNull: false,
	})
	price: string;

	@Column({
		type: DataType.DATE,
		defaultValue: DataType.NOW,
	})
	created_at: Date;

	@Column({
		type: DataType.DATE,
		defaultValue: DataType.NOW,
	})
	updated_at: Date;

	@BelongsTo(() => Property)
	property: Property;

	@BelongsTo(() => User)
	owner: User;

	@HasMany(() => Comment, { onDelete: "CASCADE" })
	comments: Comment[];
}
