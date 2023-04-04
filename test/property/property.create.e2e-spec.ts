import { INestApplication } from "@nestjs/common";
import { AuthService } from "src/modules/auth/auth.service";
import { PropertyCreateDto } from "src/modules/property/dto/property.create.dto";
import * as request from "supertest";
import { metaData } from "../../test/partials/interfaces/metadata.interface";
import { stringsmallerThan } from "../../test/partials/string/string.smallerThan.test";
import { idExists } from "../partials/id/id.exists.test";
import { idInt } from "../partials/id/id.integer.test";
import { idPositive } from "../partials/id/id.positive.test";
import { stringBiggerThan } from "../partials/string/string.biggerThan.test";
import { route, setUp } from "./constants";
describe("create property", () => {
	let app: INestApplication;
	let authService: AuthService;
	let user_token: string;
	let admin_token: string;
	let body: PropertyCreateDto;
	let metaData: metaData;
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
			description: "this is long enough",
			country_id: 1,
			city_id: 1,
			place: "in the abbo ST.",
		};
		metaData = { app, body, route, token: user_token };
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
			const property = "property_type_id";
			it(`should not accept no ${property}`, () => {
				delete body[property];
				return idInt(metaData, property);
			});
			it("should not accept decimal property_type_id", () => {
				body[property] = 1.2;
				return idInt(metaData, property);
			});
			it("should not accept negative property_type_id", () => {
				body[property] = -2;
				return idPositive(metaData, property);
			});
			it("should exist in the data base", () => {
				body[property] = 132321;
				return idExists(metaData, property);
			});
		});
		describe("country_id", () => {
			const property = "country_id";
			it(`should not accept no ${property}`, () => {
				delete body[property];
				return idInt(metaData, property);
			});
			it("should not accept decimal property_type_id", () => {
				body[property] = 1.2;
				return idInt(metaData, property);
			});
			it("should not accept negative property_type_id", () => {
				body[property] = -2;
				return idPositive(metaData, property);
			});
			it("should exist in the data base", () => {
				body[property] = 132321;
				return idExists(metaData, property);
			});
		});
		describe("city_id", () => {
			const property = "city_id";
			it(`should not accept no ${property}`, () => {
				delete body[property];
				return idInt(metaData, property);
			});
			it("should not accept decimal property_type_id", () => {
				body[property] = 1.2;
				return idInt(metaData, property);
			});
			it("should not accept negative property_type_id", () => {
				body[property] = -2;
				return idPositive(metaData, property);
			});
			it("should exist in the data base", () => {
				body[property] = 132321;
				return idExists(metaData, property);
			});
		});
		describe("name", () => {
			const property = "name";
			it("should exists", () => {
				delete body[property];
				return stringBiggerThan(metaData, property, 3);
			});
			it("should longer than 3", () => {
				body[property] = "     2f     ";
				return stringBiggerThan(metaData, property, 3);
			});
			it("should less than 45", () => {
				body[property] = "2f     ".repeat(45);
				return stringsmallerThan(metaData, property, 45);
			});
		});
		describe("description", () => {
			const property = "description";
			it("should longer than 10", () => {
				body[property] = "     2f     ";
				return stringBiggerThan(metaData, property, 10);
			});
			it("should less than 500", () => {
				body[property] = "2f     ".repeat(500);
				return stringsmallerThan(metaData, property, 500);
			});
		});
		describe("place", () => {
			const property = "place";
			it("should exists", () => {
				delete body[property];
				return stringBiggerThan(metaData, property, 3);
			});
			it("should longer than 3", () => {
				body[property] = "     2f     ";
				return stringBiggerThan(metaData, property, 3);
			});
			it("should less than 45", () => {
				body[property] = "2f     ".repeat(45);
				return stringsmallerThan(metaData, property, 45);
			});
		});
		describe("imaga", () => {
			it("should not allow non jpg image", () => {
				return request(app.getHttpServer())
					.post(route)
					.set({ Authorization: `Bearer ${user_token}` })
					.attach("file", "test/samples/.env.sample")
					.field("city_id", 1)
					.field("country_id", 1)
					.field("description", body.description)
					.field("name", body.name)
					.field("place", body.place)
					.field("property_type_id", 1)
					.expect({
						statusCode: 403,
						message:
							"Validation failed (expected type is image/jpeg)",
						error: "Forbidden",
					});
			});
			it("should not allow big image", () => {
				return request(app.getHttpServer())
					.post(route)
					.set({ Authorization: `Bearer ${user_token}` })
					.attach("file", "test/samples/big-test.jpg")
					.field("city_id", 1)
					.field("country_id", 1)
					.field("description", body.description)
					.field("name", body.name)
					.field("place", body.place)
					.field("property_type_id", 1)
					.expect({
						statusCode: 403,
						message:
							"Validation failed (expected size is less than 10000)",
						error: "Forbidden",
					});
			});
		});
		it("should create", () => {
			return request(app.getHttpServer())
				.post(route)
				.set({ Authorization: `Bearer ${user_token}` })
				.attach("file", "test/samples/jpg-test.jpg")
				.field("city_id", 1)
				.field("country_id", 1)
				.field("description", body.description)
				.field("name", body.name)
				.field("place", body.place)
				.field("property_type_id", 1)
				.expect("done");
		});
	});
	afterAll(async () => {
		await app.close();
	});
});
