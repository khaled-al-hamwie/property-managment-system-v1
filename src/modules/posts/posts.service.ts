import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { PropertyService } from "../property/property.service";
import { PostCreate } from "./interfaces/post.create.interface";
import { PostUpdate } from "./interfaces/post.update.interface";
import { Post } from "./post.entity";

@Injectable()
export class PostsService {
	constructor(
		@InjectModel(Post) private PostModule: typeof Post,
		private propertService: PropertyService
	) {}
	async createPost(body: PostCreate) {
		const property = await this.propertService.getProperty(
			body.property_id,
			body.owner_id
		);
		await this.PostModule.create(body);
		return "done";
	}

	async updatePost(body: PostUpdate) {
		const post = await this.PostModule.update(body, {
			where: { post_id: body.post_id, owner_id: body.owner_id },
			limit: 1,
		});
		if (post[0] == 0) throw new NotFoundException("post dosen't exists");
		return "done";
	}
}
