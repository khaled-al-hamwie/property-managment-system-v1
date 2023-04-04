import { INestApplication } from "@nestjs/common";
import { AuthService } from "src/modules/auth/auth.service";
import * as request from "supertest";
import { route, setUp } from "./constants";

describe("get my property", () => {
	let app: INestApplication;
	let authService: AuthService;
	let user_token: string;
	let admin_token: string;
	const the_route: string = route + "/me";
	beforeAll(() =>
		setUp().then((data) => {
			app = data.app;
			authService = data.authService;
			user_token = data.user_token;
			admin_token = data.admin_token;
		})
	);
	it("should be defined", () => {
		expect(app).toBeDefined();
		expect(authService).toBeDefined();
	});
	describe("guard", () => {
		it("should not accept no token", () => {
			return request(app.getHttpServer()).get(the_route).expect({
				statusCode: 401,
				message: "Unauthorized",
			});
		});
		it("should not accept admin token", () => {
			return request(app.getHttpServer())
				.get(the_route)
				.set({ Authorization: `Bearer ${admin_token}` })
				.expect({
					statusCode: 401,
					message: "Unauthorized",
				});
		});
	});
	it("should get all", () => {
		return request(app.getHttpServer())
			.get(the_route)
			.set({ Authorization: `Bearer ${user_token}` })
			.expect(200);
	});
});
