import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
export function idPositive(
	app: INestApplication,
	route: string,
	body: any,
	title: string,
	token: string
) {
	return request(app.getHttpServer())
		.post(route)
		.set({ Authorization: `Bearer ${token}` })
		.send(body)
		.expect({
			statusCode: 403,
			message: [`${title} must be a positive number`],
			error: "Forbidden",
		});
}
