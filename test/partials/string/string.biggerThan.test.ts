import * as request from "supertest";
import { metaData } from "../interfaces/metadata.interface";
export function stringBiggerThan(
	metaData: metaData,
	attribute_name: string,
	smallest: number
) {
	return request(metaData.app.getHttpServer())
		.post(metaData.route)
		.set({ Authorization: `Bearer ${metaData.token}` })
		.send(metaData.body)
		.expect({
			statusCode: 403,
			message: [
				`${attribute_name} must be longer than or equal to ${smallest} characters`,
			],
			error: "Forbidden",
		});
}
