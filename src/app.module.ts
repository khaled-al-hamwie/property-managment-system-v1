import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { databaseProvider } from "./core/database/database.providers";
import { AuthModule } from "./modules/auth/auth.module";
import { CredentialsModule } from "./modules/credentials/credentials.module";
import { UsersModule } from "./modules/users/users.module";
import { PropertyModule } from "./property/property.module";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		databaseProvider,
		PropertyModule,
		UsersModule,
		CredentialsModule,
		AuthModule,
	],
})
export class AppModule {}
