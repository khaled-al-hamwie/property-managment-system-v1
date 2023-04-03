import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform,
} from "@nestjs/common";

@Injectable()
export class IdPipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		console.log(value);
		throw new BadRequestException("test");
	}
}
