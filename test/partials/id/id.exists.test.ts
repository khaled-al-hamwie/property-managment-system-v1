import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
export function idExists(
	app: INestApplication,
	route: string,
	body: any,
	attribute_name: string,
	token: string
) {
	return request(app.getHttpServer())
		.post(route)
		.set({ Authorization: `Bearer ${token}` })
		.send(body)
		.expect({
			statusCode: 403,
			message: [`${attribute_name} non existed ${attribute_name}`],
			error: "Forbidden",
		});
}
