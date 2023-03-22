import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { databaseProvider } from "./core/database/database.providers";
import { AuthModule } from "./modules/auth/auth.module";
import { PostsModule } from "./modules/posts/posts.module";
import { PropertyModule } from "./modules/property/property.module";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		databaseProvider,
		PropertyModule,
		AuthModule,
		PostsModule,
	],
})
export class AppModule {}
