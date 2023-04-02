import * as request from "supertest";
import { metaData } from "../interfaces/metadata.interface";
export function stringsmallerThan(
	metaData: metaData,
	attribute_name: string,
	biggest: number
) {
	return request(metaData.app.getHttpServer())
		.post(metaData.route)
		.set({ Authorization: `Bearer ${metaData.token}` })
		.send(metaData.body)
		.expect({
			statusCode: 403,
			message: [
				`${attribute_name} must be shorter than or equal to ${biggest} characters`,
			],
			error: "Forbidden",
		});
}
