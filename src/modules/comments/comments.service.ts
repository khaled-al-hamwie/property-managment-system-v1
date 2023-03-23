import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { PostsService } from "../posts/posts.service";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Comment } from "./entities/comment.entity";
import { CommentCreate } from "./interfaces/comment.create.interface";

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

	update(id: number, updateCommentDto: UpdateCommentDto) {
		return `This action updates a #${id} comment`;
	}

	remove(id: number) {
		return `This action removes a #${id} comment`;
	}
}
