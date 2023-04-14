import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { PropertyType } from "./property-type.entity";
import { PropertyTypesController } from "./property-types.controller";
import { PropertyTypesService } from "./property-types.service";

@Module({
	imports: [SequelizeModule.forFeature([PropertyType])],
	providers: [PropertyTypesService],
	controllers: [PropertyTypesController],
	exports: [PropertyTypesService],
})
export class PropertyTypesModule {}
