import { INestApplication } from "@nestjs/common";
import { AuthService } from "src/modules/auth/auth.service";
import { PropertyCreateDto } from "src/modules/property/dto/property.create.dto";
import * as request from "supertest";
import { idInt } from "../../spec/id/id.integer.test";
import { idPositive } from "../../spec/id/id.positive.test";
import { route, setUp } from "./constants";
describe("create property", () => {
	let app: INestApplication;
	let authService: AuthService;
	let user_token: string;
	let admin_token: string;
	let body: PropertyCreateDto;
	beforeAll(() =>
		setUp().then((data) => {
			app = data.app;
			authService = data.authService;
			user_token = data.user_token;
			admin_token = data.admin_token;
		})
	);

	beforeEach(() => {
		body = {
			property_type_id: 1,
			name: "my appartment",
			description: "",
			country_id: 1,
			city_id: 1,
			place: "in the abbo ST.",
		};
	});
	it("should be defined", () => {
		expect(app).toBeDefined();
		expect(authService).toBeDefined();
	});
	describe("guard", () => {
		it("should not accept no token", () => {
			return request(app.getHttpServer()).post(route).expect({
				statusCode: 401,
				message: "Unauthorized",
			});
		});
		it("should not accept admin token", () => {
			return request(app.getHttpServer())
				.post(route)
				.set({ Authorization: `Bearer ${admin_token}` })
				.expect({
					statusCode: 401,
					message: "Unauthorized",
				});
		});
	});
	describe("validation", () => {
		it("should not accept no body", () => {
			return request(app.getHttpServer())
				.post(route)
				.set({ Authorization: `Bearer ${user_token}` })
				.expect(403);
		});
		describe("property_type_id", () => {
			const title = "property_type_id";
			it(`should not accept no ${title}`, () => {
				delete body.property_type_id;
				return idInt(app, route, body, title, user_token);
			});
			it("should not accept decimal property_type_id", () => {
				body.property_type_id = 1.2;
				return idInt(app, route, body, title, user_token);
			});
			it("should not accept negative property_type_id", () => {
				body.property_type_id = -2;
				return idPositive(app, route, body, title, user_token);
			});
		});
	});
	afterAll(async () => {
		await app.close();
	});
});
