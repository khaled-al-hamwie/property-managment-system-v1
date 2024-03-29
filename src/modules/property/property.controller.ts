import {
	Body,
	Controller,
	DefaultValuePipe,
	Delete,
	Get,
	ParseFilePipeBuilder,
	ParseIntPipe,
	Patch,
	Post,
	Query,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from "express";
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
	@UseInterceptors(FileInterceptor("file"))
	createProperty(
		@User("user_id") owner_id: number,
		@Body() body: PropertyCreateDto,
		@UploadedFile(
			new ParseFilePipeBuilder()
				.addFileTypeValidator({ fileType: "image/jpeg" })
				.addMaxSizeValidator({ maxSize: 10_000 })
				.build({ errorHttpStatusCode: 403, fileIsRequired: false })
		)
		image: Express.Multer.File
	) {
		return this.propertyService.create(owner_id, body, image);
	}

	@UseGuards(UserGuard)
	@Get("/me")
	getAll(
		@User("user_id") owner_id: number,
		@Query("page", new DefaultValuePipe(5), ParseIntPipe) limit: number,
		@Query("offset", new DefaultValuePipe(0), ParseIntPipe)
		offset: number
	) {
		return this.propertyService.getAll(owner_id, limit, offset);
	}

	@UseGuards(UserGuard)
	@Patch(":id")
	@UseInterceptors(FileInterceptor("image"))
	updateProperty(
		@User("user_id") owner_id: number,
		@Body() body: PropertyUpdateDto,
		@IdParam(ParseIntPipe)
		property_id: number,
		@UploadedFile(
			new ParseFilePipeBuilder()
				.addFileTypeValidator({ fileType: "image/jpeg" })
				.addMaxSizeValidator({ maxSize: 10_000 })
				.build({ errorHttpStatusCode: 403, fileIsRequired: false })
		)
		image: Express.Multer.File
	) {
		return this.propertyService.updateProperty(
			property_id,
			owner_id,
			body,
			image
		);
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
