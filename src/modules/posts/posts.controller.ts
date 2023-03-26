import {
	Body,
	Controller,
	Delete,
	Get,
	ParseIntPipe,
	Patch,
	Post,
	Query,
	UseGuards,
} from "@nestjs/common";
import { IdParam } from "src/core/decorator/id.decorator";
import { User } from "src/core/decorator/user.decorator";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { PostCreateDto } from "./dto/post.create.dto";
import { PostUpdateDto } from "./dto/post.update.dto";
import { PostsService } from "./posts.service";

@Controller("posts")
export class PostsController {
	constructor(private postService: PostsService) {}
	@UseGuards(JwtAuthGuard)
	@Post()
	createPost(@User("user_id") owner_id: number, @Body() body: PostCreateDto) {
		return this.postService.createPost({
			...body,
			owner_id,
		});
	}

	@Get()
	getPosts(@Query("search") search: string) {
		return this.postService.getPosts(search);
	}

	@UseGuards(JwtAuthGuard)
	@Patch(":id")
	updatePost(
		@User("user_id") owner_id: number,
		@Body() body: PostUpdateDto,
		@IdParam(ParseIntPipe)
		post_id: number
	) {
		return this.postService.updatePost({ ...body, post_id, owner_id });
	}

	@Get(":id")
	getPost(
		@IdParam(ParseIntPipe)
		post_id: number
	) {
		return this.postService.getPost(post_id);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(":id")
	deletePost(
		@User("user_id") owner_id: number,
		@IdParam(ParseIntPipe)
		post_id: number
	) {
		return this.postService.deletePost({ post_id, owner_id });
	}
}
