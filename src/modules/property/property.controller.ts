import {
	Body,
	Controller,
	DefaultValuePipe,
	Delete,
	Get,
	ParseIntPipe,
	Patch,
	Post,
	Query,
	UseGuards,
} from "@nestjs/common";
import { IdParam } from "src/core/decorator/id.decorator";
import { User } from "src/core/decorator/user.decorator";
import { UserGuard } from "../auth/guard/user.guard";
import { PropertyCreateDto } from "./dto/property.create.dto";
import { PropertyUpdateDto } from "./dto/property.update.dto";
import { PropertyService } from "./property.service";

@Controller("property")
export class PropertyController {
	constructor(private propertyService: PropertyService) {}

	@UseGuards(UserGuard)
	@Post()
	createProperty(
		@User("user_id") owner_id: number,
		@Body() body: PropertyCreateDto
	) {
		return this.propertyService.create(owner_id, body);
	}

	@UseGuards(UserGuard)
	@Get("/me")
	getMyProperties(
		@User("user_id") owner_id: number,
		@Query("page", new DefaultValuePipe(5), ParseIntPipe) limit: number,
		@Query("offset", new DefaultValuePipe(0), ParseIntPipe)
		offset: number
	) {
		return this.propertyService.getMyProperties(owner_id, limit, offset);
	}

	@UseGuards(UserGuard)
	@Patch(":id")
	updateProperty(
		@User("user_id") owner_id: number,
		@Body() body: PropertyUpdateDto,
		@IdParam(ParseIntPipe)
		property_id: number
	) {
		return this.propertyService.updateProperty({
			...body,
			property_id,
			owner_id,
		});
	}

	@UseGuards(UserGuard)
	@Delete(":id")
	deleteProperty(
		@User("user_id") owner_id: number,
		@IdParam(ParseIntPipe) property_id: number
	) {
		return this.propertyService.deleteProperty({ property_id, owner_id });
	}
}
