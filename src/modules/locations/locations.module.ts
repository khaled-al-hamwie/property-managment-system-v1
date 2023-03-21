import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CitiesModule } from "../cities/cities.module";
import { CountriesModule } from "../countries/countries.module";
import { Location } from "./location.entity";
import { LocationsService } from "./locations.service";
@Module({
	imports: [
		SequelizeModule.forFeature([Location]),
		CitiesModule,
		CountriesModule,
	],
	providers: [LocationsService],
	exports: [LocationsService],
})
export class LocationsModule {}
