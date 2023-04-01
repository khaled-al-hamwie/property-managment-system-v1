import { INestApplication } from "@nestjs/common";
import { AuthService } from "src/modules/auth/auth.service";
import * as request from "supertest";
import { route, setUp } from "./constants";

describe("find All countries", () => {
	let app: INestApplication;
	let authService: AuthService;
	let token: string;
	beforeAll(() =>
		setUp().then((data) => {
			app = data.app;
			authService = data.authService;
			token = data.token;
		})
	);

	it("should be defined", () => {
		expect(app).toBeDefined();
		expect(authService).toBeDefined();
	});

	it("should not accept no search", () => {
		return request(app.getHttpServer())
			.get(route)
			.set({ Authorization: `Bearer ${token}` })
			.expect({
				statusCode: 403,
				message: ["search the query search is required"],
				error: "Forbidden",
			});
	});
});
