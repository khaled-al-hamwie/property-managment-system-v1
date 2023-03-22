import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { PropertyService } from "../property/property.service";
import { PostCreate } from "./interfaces/post.create.interface";
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
}
