import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CountriesService } from "./countries.service";
import { Country } from "./country.entity";

@Module({
	imports: [SequelizeModule.forFeature([Country])],
	providers: [CountriesService],
})
export class CountriesModule {}
