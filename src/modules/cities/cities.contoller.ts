import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { AdminGuard } from "../auth/guard/admin.guard";
import { CitiesService } from "./cities.service";
import { CityDto } from "./dto/city.dto";

@Controller("admin/city")
export class CitiesController {
	constructor(private citiesService: CitiesService) {}
	// add city
	@UseGuards(AdminGuard)
	@Post()
	create(@Body() body: CityDto) {
		return this.citiesService.create(body);
	}

	@UseGuards(AdminGuard)
	@Get()
	findAll(@Query("search") search) {
		return this.citiesService.findAll(search);
	}
	// update city
	// remove city
}
