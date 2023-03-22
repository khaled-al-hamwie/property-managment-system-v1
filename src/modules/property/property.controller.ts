import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Req,
	UseGuards,
} from "@nestjs/common";
import { User } from "src/core/decorator/user.decorator";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { PropertyCreateDto } from "./dto/property.create.dto";
import { PropertyUpdateDto } from "./dto/property.update.dto";
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
	createProperty(
		@User("user_id") user_id: number,
		@Body() body: PropertyCreateDto
	) {
		let property_attributes: PropertyCreate = {
			...body,
			owner_id: user_id,
		};
		return this.propertyService.createProperty(property_attributes);
	}

	@UseGuards(JwtAuthGuard)
	@Patch(":id")
	updateProperty(
		@User("user_id") owner_id: number,
		@Body() body: PropertyUpdateDto,
		@Param(
			"id",
			new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
		)
		property_id: number
	) {
		return this.propertyService.updateProperty({
			...body,
			property_id,
			owner_id,
		});
	}

	@UseGuards(JwtAuthGuard)
	@Delete(":id")
	deleteProperty(
		@User("user_id") owner_id: number,
		@Param(
			"id",
			new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
		)
		property_id: number
	) {
		return this.propertyService.deleteProperty({ property_id, owner_id });
	}
}
