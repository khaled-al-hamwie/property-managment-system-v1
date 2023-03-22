import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { PropertyModule } from "../property/property.module";
import { Post } from "./post.entity";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";

@Module({
	imports: [PropertyModule, SequelizeModule.forFeature([Post])],
	providers: [PostsService],
	controllers: [PostsController],
})
export class PostsModule {}
