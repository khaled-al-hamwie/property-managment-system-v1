import { Module } from "@nestjs/common";
import { countriesController } from "./countries.controller";
import { CountriesService } from "./countries.service";

@Module({
	controllers: [countriesController],
	providers: [CountriesService],
})
export class CountriesModule {}
