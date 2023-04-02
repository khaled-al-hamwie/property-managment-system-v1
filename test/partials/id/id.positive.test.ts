import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
export function idPositive(
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
			message: [`${attribute_name} must be a positive number`],
			error: "Forbidden",
		});
}
