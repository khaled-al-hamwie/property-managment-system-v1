import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	UseGuards,
} from "@nestjs/common";
import { IdParam } from "src/core/decorator/id.decorator";
import { User } from "src/core/decorator/user.decorator";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";

@Controller("posts/:postId/comments")
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	create(
		@User("user_id") user_id: number,
		@Body() body: CreateCommentDto,
		@IdParam("postId", ParseIntPipe) post_id: number
	) {
		return this.commentsService.create({
			...body,
			owner_id: user_id,
			post_id,
		});
	}

	@Get()
	findAll(@IdParam("postId", ParseIntPipe) post_id: number) {
		return this.commentsService.findAll(post_id);
	}

	@UseGuards(JwtAuthGuard)
	@Patch(":id")
	update(
		@User("user_id") user_id: number,
		@IdParam("id", ParseIntPipe) comment_id: number,
		@IdParam("postId", ParseIntPipe) post_id: number,
		@Body() body: UpdateCommentDto
	) {
		return this.commentsService.update({
			...body,
			user_id,
			comment_id,
			post_id,
		});
	}

	@UseGuards(JwtAuthGuard)
	@Delete(":id")
	remove(
		@User("user_id") user_id: number,
		@IdParam("id", ParseIntPipe) comment_id: number
	) {
		return this.commentsService.remove(user_id, comment_id);
	}
}
