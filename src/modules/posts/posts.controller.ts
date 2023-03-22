import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { User } from "src/core/decorator/user.decorator";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { PostCreateDto } from "./dto/post.create.dto";
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
}
