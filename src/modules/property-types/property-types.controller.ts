import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AdminGuard } from "../auth/guard/admin.guard";
import PropertyTypeDto from "./dto/property-type.dto";
import { PropertyTypesService } from "./property-types.service";

@Controller()
export class PropertyTypesController {
	constructor(private propertyTypeService: PropertyTypesService) {}
	@UseGuards(AdminGuard)
	@Post("admin/property-type")
	create(@Body() body: PropertyTypeDto) {
		return this.propertyTypeService.create(body);
	}

	@Get("/property-type")
	findAll() {
		return this.propertyTypeService.findAll();
	}
}
