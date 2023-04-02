import * as request from "supertest";
import { metaData } from "../interfaces/metadata.interface";
export function idExists(metaData: metaData, attribute_name: string) {
	return request(metaData.app.getHttpServer())
		.post(metaData.route)
		.set({ Authorization: `Bearer ${metaData.token}` })
		.send(metaData.body)
		.expect({
			statusCode: 403,
			message: [`${attribute_name} non existed ${attribute_name}`],
			error: "Forbidden",
		});
}
