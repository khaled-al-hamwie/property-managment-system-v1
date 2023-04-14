import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AdminGuard } from "../auth/guard/admin.guard";
import PropertyTypeDto from "./dto/property-type.dto";
import { PropertyTypesService } from "./property-types.service";

@Controller("admin/property-type")
export class PropertyTypesController {
	constructor(private propertyTypeService: PropertyTypesService) {}
	@UseGuards(AdminGuard)
	@Post()
	create(@Body() body: PropertyTypeDto) {
		return this.propertyTypeService.create(body);
	}
}
