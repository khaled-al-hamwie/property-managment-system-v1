import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { PostsModule } from "../posts/posts.module";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";
import { Comment } from "./entities/comment.entity";

@Module({
	imports: [PostsModule, SequelizeModule.forFeature([Comment])],
	controllers: [CommentsController],
	providers: [CommentsService],
})
export class CommentsModule {}
