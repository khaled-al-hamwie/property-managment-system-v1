import { INestApplication } from "@nestjs/common";
import { AuthService } from "src/modules/auth/auth.service";
import { PropertyUpdateDto } from "src/modules/property/dto/property.update.dto";
import { PropertyService } from "src/modules/property/property.service";
import * as request from "supertest";
import { metaData } from "test/partials/interfaces/metadata.interface";
import { route, setUp } from "./constants";

describe("update property", () => {
	let app: INestApplication;
	let authService: AuthService;
	let propertyService: PropertyService;
	let user_token: string;
	let admin_token: string;
	let body: PropertyUpdateDto;
	let metaData: metaData;
	let path: string = route + "/1";
	beforeAll(() =>
		setUp().then((data) => {
			app = data.app;
			authService = data.authService;
			user_token = data.user_token;
			admin_token = data.admin_token;
			propertyService = data.propertyService;
		})
	);
	beforeEach(() => {
		body = {
			name: "my appartment",
			description: "this is long enough",
		};
		metaData = { app, body, route: path, token: user_token };
	});
	it("should be defined", () => {
		expect(app).toBeDefined();
		expect(authService).toBeDefined();
		expect(propertyService).toBeDefined();
	});
	describe("guard", () => {
		it("should not accept no token", () => {
			return request(app.getHttpServer()).patch(path).expect({
				statusCode: 401,
				message: "Unauthorized",
			});
		});
		it("should not accept admin token", () => {
			return request(app.getHttpServer())
				.patch(path)
				.set({ Authorization: `Bearer ${admin_token}` })
				.expect({
					statusCode: 401,
					message: "Unauthorized",
				});
		});
	});
	describe("validation", () => {
		describe("name", () => {
			const property = "name";
			it("should longer than 3", () => {
				body[property] = "     2f     ";
				return request(metaData.app.getHttpServer())
					.patch(metaData.route)
					.set({ Authorization: `Bearer ${metaData.token}` })
					.send(metaData.body)
					.expect({
						statusCode: 403,
						message: [
							`${property} must be longer than or equal to 3 characters`,
						],
						error: "Forbidden",
					});
			});
			it("should less than 45", () => {
				body[property] = "2f     ".repeat(45);
				return request(metaData.app.getHttpServer())
					.patch(metaData.route)
					.set({ Authorization: `Bearer ${metaData.token}` })
					.send(metaData.body)
					.expect({
						statusCode: 403,
						message: [
							`${property} must be shorter than or equal to 45 characters`,
						],
						error: "Forbidden",
					});
			});
		});
		describe("description", () => {
			const property = "description";
			it("should longer than 10", () => {
				body[property] = "     2f     ";
				return request(metaData.app.getHttpServer())
					.patch(metaData.route)
					.set({ Authorization: `Bearer ${metaData.token}` })
					.send(metaData.body)
					.expect({
						statusCode: 403,
						message: [
							`${property} must be longer than or equal to 10 characters`,
						],
						error: "Forbidden",
					});
			});
			it("should less than 500", () => {
				body[property] = "2f     ".repeat(500);
				return request(metaData.app.getHttpServer())
					.patch(metaData.route)
					.set({ Authorization: `Bearer ${metaData.token}` })
					.send(metaData.body)
					.expect({
						statusCode: 403,
						message: [
							`${property} must be shorter than or equal to 500 characters`,
						],
						error: "Forbidden",
					});
			});
		});
		describe("imaga", () => {
			it("should not allow non jpg image", () => {
				return request(app.getHttpServer())
					.patch(path)
					.set({ Authorization: `Bearer ${user_token}` })
					.attach("image", "test/samples/.env.sample")
					.expect({
						statusCode: 403,
						message:
							"Validation failed (expected type is image/jpeg)",
						error: "Forbidden",
					});
			});
			it("should not allow big image", () => {
				return request(app.getHttpServer())
					.patch(path)
					.set({ Authorization: `Bearer ${user_token}` })
					.attach("image", "test/samples/big-test.jpg")
					.expect({
						statusCode: 403,
						message:
							"Validation failed (expected size is less than 10000)",
						error: "Forbidden",
					});
			});
		});
	});

	it("should update", () => {
		// propertyService.create({})
		expect("hi").toBe("latter");
	});

	afterAll(async () => {
		await app.close();
	});
});
