import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { PropertyDto } from "./dto/property.dto";
import { PropertyCreate } from "./interfaces/property.create.interface";
import { PropertyService } from "./property.service";

@Controller("property")
export class PropertyController {
	constructor(private propertyService: PropertyService) {}
	@Get()
	getProperties() {
		return this.propertyService.getProperties();
	}
	@UseGuards(JwtAuthGuard)
	@Post()
	createProperty(@Req() req, @Body() body: PropertyDto) {
		let property_attributes: PropertyCreate = {
			...body,
			owner_id: Number(req.user.user_id),
		};
		return this.propertyService.createProperty(property_attributes);
	}
}
