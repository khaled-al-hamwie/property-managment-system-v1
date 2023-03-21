import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { databaseProvider } from "./core/database/database.providers";
import { AuthModule } from "./modules/auth/auth.module";
import { CitiesModule } from "./modules/cities/cities.module";
import { CountriesModule } from "./modules/countries/countries.module";
import { CredentialsModule } from "./modules/credentials/credentials.module";
import { PropertyModule } from "./modules/property/property.module";
import { UsersModule } from "./modules/users/users.module";
import { PropertyTypesModule } from './modules/property-types/property-types.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		databaseProvider,
		UsersModule,
		PropertyModule,
		CredentialsModule,
		AuthModule,
		CitiesModule,
		CountriesModule,
		PropertyTypesModule,
	],
})
export class AppModule {}
