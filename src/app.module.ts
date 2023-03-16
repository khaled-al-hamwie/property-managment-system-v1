import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./core/database/database.module";
import { PropertyModule } from "./property/property.module";
import { UsersModule } from './modules/users/users.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		PropertyModule,
		DatabaseModule,
		UsersModule,
	],
})
export class AppModule {}
