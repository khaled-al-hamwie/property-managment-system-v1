import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CitiesService } from "./cities.service";
import { City } from "./city.entity";

@Module({
	imports: [SequelizeModule.forFeature([City])],
	providers: [CitiesService],
})
export class CitiesModule {}
