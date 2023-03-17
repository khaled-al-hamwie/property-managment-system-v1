import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./core/database/database.module";
import { CredentialsModule } from "./modules/credentials/credentials.module";
import { UsersModule } from "./modules/users/users.module";
import { PropertyModule } from "./property/property.module";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		PropertyModule,
		DatabaseModule,
		UsersModule,
		CredentialsModule,
	],
})
export class AppModule {}
