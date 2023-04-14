import { INestApplication } from "@nestjs/common";
import { Admin } from "src/modules/admins/admin.entity";
import { Credential } from "src/modules/credentials/credential.entity";
import PropertyTypeDto from "src/modules/property-types/dto/property-type.dto";
import { PropertyType } from "src/modules/property-types/property-type.entity";
import { User } from "src/modules/users/user.entity";
import * as request from "supertest";
import { metaData } from "test/partials/interfaces/metadata.interface";
import { AuthService } from "../../src/modules/auth/auth.service";
import { stringBiggerThan } from "../../test/partials/string/string.biggerThan.test";
import { stringsmallerThan } from "../../test/partials/string/string.smallerThan.test";
import { route, setUp } from "./constants";

let admin_token: string;
let body: PropertyTypeDto;
let metaData: metaData;
describe("delete admin", () => {
	let app: INestApplication;
	let authService: AuthService;
	beforeAll(async () => {
		await setUp().then((data) => {
			app = data.app;
			authService = data.authService;
		});
		await Admin.destroy({ where: {} });
		await User.destroy({ where: {} });
		await Credential.destroy({ where: {} });
		await PropertyType.destroy({ where: {} });
		admin_token = (
			await authService.registerAdmin({
				email: "testra@test.com",
				password: "112233441122334411223344",
				user_name: "testra",
				first_name: "test",
				last_name: "test",
				contact_email: "testr@test.com",
			})
		).access_token;
	});
	beforeEach(() => {
		body = {
			name: "my appartment",
		};
		metaData = { app, body, route, token: admin_token };
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
	});
	it("should create", async () => {
		const res = await request(app.getHttpServer())
			.post(route)
			.set({ Authorization: `Bearer ${admin_token}` })
			.send(body);
		const propertyType = await PropertyType.findOne({
			where: { name: body.name },
		});
		expect(res.status).toBe(201);
		expect(propertyType).not.toBeNaN();
	});
	describe("validation", () => {
		it("should not accept no body", () => {
			return request(app.getHttpServer())
				.post(route)
				.set({ Authorization: `Bearer ${admin_token}` })
				.expect(403);
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
			it("should not allow the same property type name", () => {
				return request(app.getHttpServer())
					.post(route)
					.set({ Authorization: `Bearer ${admin_token}` })
					.send(body)
					.expect(409);
			});
		});
	});

	afterAll(async () => {
		await app.close();
	});
});
