export interface CommentUpdate {
	comment_id: number;
	user_id: number;
	post_id: number;
	description?: string;
}
