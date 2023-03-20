import { Module } from "@nestjs/common";
import { LocationsModule } from "../locations/locations.module";
import { PropertyController } from "./property.controller";
import { PropertyService } from "./property.service";

@Module({
	imports: [LocationsModule],
	controllers: [PropertyController],
	providers: [PropertyService],
})
export class PropertyModule {}
