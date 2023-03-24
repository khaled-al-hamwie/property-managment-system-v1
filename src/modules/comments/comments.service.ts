import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { PostsService } from "../posts/posts.service";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Comment } from "./entities/comment.entity";
import { CommentCreate } from "./interfaces/comment.create.interface";
import { CommentUpdate } from "./interfaces/comment.update.interface";

@Injectable()
export class CommentsService {
	constructor(
		@InjectModel(Comment) private CommentModule: typeof Comment,
		private postsService: PostsService
	) {}
	async create(body: CommentCreate) {
		await this.postsService.findPost(body.post_id);
		await this.CommentModule.create(body);
		return "done";
	}

	async findAll(post_id: number) {
		await this.postsService.findPost(post_id);
		return this.CommentModule.findAll({
			where: { post_id },
			attributes: ["owner_id", "description"],
		});
	}

	async update(body: CommentUpdate) {
		const comment = await this.CommentModule.update(body, {
			where: {
				comment_id: body.comment_id,
				owner_id: body.user_id,
				post_id: body.post_id,
			},
		});
		if (comment[0] == 0)
			throw new NotFoundException("comment dosen't exists");
		return "done";
	}

	remove(id: number) {
		return `This action removes a #${id} comment`;
	}
}
