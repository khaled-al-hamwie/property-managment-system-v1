import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AdminGuard } from "../auth/guard/admin.guard";
import { CitiesService } from "./cities.service";
import { CityDto } from "./dto/city.dto";

@Controller("admin/city")
export class CitiesController {
	constructor(private citiesService: CitiesService) {}
	// add city
	// @UseGuards(AdminGuard)
	@Post()
	create(@Body() body: CityDto) {
		console.log("hi");
		console.log(body);
		return this.citiesService.create(body);
	}
	// update city
	// remove city
}
