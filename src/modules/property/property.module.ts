import { Module } from "@nestjs/common";
import { CitiesModule } from "../cities/cities.module";
import { CountriesModule } from "../countries/countries.module";
import { LocationsModule } from "../locations/locations.module";
import { PropertyController } from "./property.controller";
import { PropertyService } from "./property.service";

@Module({
	imports: [LocationsModule, CitiesModule, CountriesModule],
	controllers: [PropertyController],
	providers: [PropertyService],
})
export class PropertyModule {}
