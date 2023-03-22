import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { LocationsModule } from "../locations/locations.module";
import { PropertyTypesModule } from "../property-types/property-types.module";
import { PropertyController } from "./property.controller";
import { Property } from "./property.entity";
import { PropertyService } from "./property.service";

@Module({
	imports: [
		SequelizeModule.forFeature([Property]),
		LocationsModule,
		PropertyTypesModule,
	],
	controllers: [PropertyController],
	providers: [PropertyService],
	exports: [PropertyService],
})
export class PropertyModule {}
