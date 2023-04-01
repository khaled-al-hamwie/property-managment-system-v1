import {
	Controller,
	ForbiddenException,
	Get,
	Query,
	UseGuards,
} from "@nestjs/common";
import { AdminGuard } from "../auth/guard/admin.guard";
import { CountriesService } from "./countries.service";

@UseGuards(AdminGuard)
@Controller("admin/country")
export class CountriesController {
	constructor(private countriesService: CountriesService) {}
	@Get()
	findAll(@Query("search") search: string) {
		if (!search) {
			throw new ForbiddenException(
				["search the query search is required"],
				{
					description: "Forbidden",
				}
			);
		}
		return this.countriesService.findAll(search);
	}
}
