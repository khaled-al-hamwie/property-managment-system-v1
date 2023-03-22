import {
	Body,
	Controller,
	ParseIntPipe,
	Patch,
	Post,
	UseGuards,
} from "@nestjs/common";
import { IdParam } from "src/core/decorator/id.decorator";
import { User } from "src/core/decorator/user.decorator";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { PostCreateDto } from "./dto/post.create.dto";
import { PostUpdateDto } from "./dto/post.update.dto";
import { PostsService } from "./posts.service";

@Controller("post")
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
}
