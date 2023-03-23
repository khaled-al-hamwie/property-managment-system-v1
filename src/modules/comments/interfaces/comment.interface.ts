import { Optional } from "sequelize";

export interface CommentAttributes {
	comment_id: number;
	owner_id: number;
	post_id: number;
	body: string;
}

export interface CommentCreationAttributes
	extends Optional<CommentAttributes, "comment_id"> {
	comment_id: number;
	owner_id: number;
	post_id: number;
	body: string;
}
