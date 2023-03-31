import { INestApplication } from "@nestjs/common";
import { AuthService } from "src/modules/auth/auth.service";
import { CityDto } from "src/modules/cities/dto/city.dto";
import * as request from "supertest";
import { route, setUp } from "./constants";
describe("create a city", () => {
	let app: INestApplication;
	let authService: AuthService;
	let token: string;
	let body: CityDto;
	beforeAll(() =>
		setUp().then((data) => {
			app = data.app;
			authService = data.authService;
			token = data.token;
		})
	);
	beforeEach(() => {
		body = {
			name: "gorgia",
			country_id: 1,
			state: "some where",
		};
	});
	it("should be defined", () => {
		expect(app).toBeDefined();
		expect(authService).toBeDefined();
	});
	it("should create", () => {
		return request(app.getHttpServer())
			.post("/admin/city")
			.set({ Authorization: `Bearer ${token}` })
			.send(body)
			.expect({});
	});
	describe("validate", () => {
		it("should not accept names smaller than 3", () => {
			delete body.name;
			return request(app.getHttpServer())
				.post(route)
				.set({ Authorization: `Bearer ${token}` })
				.send(body)
				.expect({
					statusCode: 403,
					message: [
						"name must be longer than or equal to 3 characters",
					],
					error: "Forbidden",
				});
		});
		it("should not accept no country_id", () => {
			delete body.country_id;
			return request(app.getHttpServer())
				.post(route)
				.set({ Authorization: `Bearer ${token}` })
				.send(body)
				.expect({
					statusCode: 403,
					message: ["country_id must be an integer number"],
					error: "Forbidden",
				});
		});
		it("should not accept negative country_id", () => {
			body.country_id = -2;
			return request(app.getHttpServer())
				.post(route)
				.set({ Authorization: `Bearer ${token}` })
				.send(body)
				.expect({
					statusCode: 403,
					message: ["country_id must be a positive number"],
					error: "Forbidden",
				});
		});
		it("should not accept decimal country_id", () => {
			body.country_id = 2.2;
			return request(app.getHttpServer())
				.post(route)
				.set({ Authorization: `Bearer ${token}` })
				.send(body)
				.expect({
					statusCode: 403,
					message: ["country_id must be an integer number"],
					error: "Forbidden",
				});
		});
	});
	afterAll(async () => {
		await app.close();
	});
});
