import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Location } from "./location.entity";
import { LocationsService } from "./locations.service";
@Module({
	imports: [SequelizeModule.forFeature([Location])],
	providers: [LocationsService],
	exports: [LocationsService],
})
export class LocationsModule {}
