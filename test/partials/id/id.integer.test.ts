import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { metaData } from "../interfaces/metadata.interface";
export function idInt(metaData: metaData, attribute_name: string) {
	return request(metaData.app.getHttpServer())
		.post(metaData.route)
		.set({ Authorization: `Bearer ${metaData.token}` })
		.send(metaData.body)
		.expect({
			statusCode: 403,
			message: [`${attribute_name} must be an integer number`],
			error: "Forbidden",
		});
}
