import { Body, Controller, Get, Post } from "@nestjs/common";
import { PropertyService } from "./property.service";

@Controller("property")
export class PropertyController {
	constructor(private propertyService: PropertyService) {}
	@Get()
	getProperties() {
		return this.propertyService.getProperties();
	}
	@Post()
	createProperty(@Body() body: any) {
		return this.propertyService.createProperty();
	}
}
