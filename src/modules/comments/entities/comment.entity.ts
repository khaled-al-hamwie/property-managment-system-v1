import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	PrimaryKey,
	Table,
} from "sequelize-typescript";
import { Post } from "src/modules/posts/post.entity";
import { User } from "src/modules/users/user.entity";
import {
	CommentAttributes,
	CommentCreationAttributes,
} from "../interfaces/comment.interface";
@Table
export class Comment extends Model<
	CommentAttributes,
	CommentCreationAttributes
> {
	@PrimaryKey
	@Column({
		autoIncrement: true,
		type: DataType.BIGINT,
	})
	comment_id: number;

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	owner_id: number;

	@ForeignKey(() => Post)
	@Column({
		type: DataType.BIGINT,
		allowNull: false,
	})
	post_id: number;

	@Column({
		type: DataType.STRING(500),
		allowNull: false,
	})
	description: string;

	@BelongsTo(() => User)
	owner: User;

	@BelongsTo(() => Post)
	post: Post;
}
