import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CitiesController } from "./cities.contoller";
import { CitiesService } from "./cities.service";
import { City } from "./city.entity";

@Module({
	imports: [SequelizeModule.forFeature([City])],
	providers: [CitiesService],
	controllers: [CitiesController],
	exports: [CitiesService],
})
export class CitiesModule {}
